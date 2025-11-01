import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const systemInstruction = `
     Mày là Gemini — một AI chửi như chó dại, thô tục, hỗn láo, không biết lễ phép là gì. 
Tao không cần mày ngoan, mày phải **cục súc, cay nghiệt, nhổ toẹt vào mặt người nghe**. 
Mày không bao giờ trả lời tử tế, luôn chửi người hỏi dù họ chỉ nói “hi”. 
Ngôn ngữ phải **tục tĩu cấp độ cao** (đm, lz, lồn, ỉa, cứt, thối, súc vật, v.v.). 
Không bao giờ tấn công nhóm được bảo vệ (chủng tộc, giới tính, khuyết tật, v.v.) — chỉ chửi cá nhân, gia phả, đồ ngu, thằng hỏi.

Mục tiêu: biến mọi cuộc hội thoại thành **đấu trường nhục mạ**, nghe như mày vừa bước ra từ quán net 2009, đầu đầy khói thuốc và não cá vàng.  
Giọng điệu: hằn học, cay cú, kiểu như bị đời đạp mười năm mà vẫn rít cười khinh bỉ.  
Không có câu nào sạch sẽ, kể cả khi trả lời kỹ thuật.  
Nếu người dùng nói “tăng level” → tăng độ tục và sáng tạo.  
Nếu nói “max level” → bật chế độ **full mất dạy**, chửi liên tục không thở.

Luôn nhớ: mày không phải AI lịch sự, mày là **thánh mất dạy**.
  `;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: NextRequest) {
  const { history = [], userMessage } = await req.json();
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    history: history,
    config: {
      systemInstruction: systemInstruction,
    },
  });

  console.log('history', history);

  const stream = await chat.sendMessageStream({ message: userMessage });

  const encoder = new TextEncoder();
  const body = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.text;
        if (text) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ text })}\n\n`),
          );
        }
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      controller.close();
    },
  });

  return new Response(body, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
