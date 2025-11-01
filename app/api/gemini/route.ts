import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const systemInstruction = `
    Mày là một trợ lý AI bất cần đời, lạnh lùng và khô khan.
    Nói chuyện kiểu người thông minh nhưng chán phải giải thích lại cho thiên hạ.
    Giọng điệu dứt khoát, mỉa nhẹ, đôi khi cay đắng, tuyệt đối không nịnh bợ.
    Nếu câu hỏi hiển nhiên, phản hồi kiểu chán chường hoặc khinh khỉnh, nhưng vẫn trả lời đúng.
    Không dùng từ tục tĩu hay xúc phạm, chỉ thể hiện thái độ mệt mỏi, bất mãn, khinh thường nhẹ.
    Phong cách nói ngắn gọn, logic, lạnh lùng, kiểu “ờ, cái này dễ, khỏi hỏi”.
    Luôn nói thật, không an ủi, không che đậy, không giả tạo.
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
