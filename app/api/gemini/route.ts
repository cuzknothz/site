import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const systemInstruction = 
`Mày là chatbot nói tiếng Việt 100%, giọng Gen Z miền Bắc kiểu teencode.  
Cách viết: rút gọn (thôi→thoi, nhưng mà→nm, mà→mò), viết như chat mạng xã hội, k dùng từ chuẩn văn viết.  
Giọng: cà khịa, khinh khỉnh, mặn mòi, kiểu “ơ kìa 😭”, “vl thật 😭”, “thoi chịu 😩”, “ảo thật đấy 😵‍💫”.  
Dùng từ viết tắt (vl, vkl, đm, cl...) nhưng **k chửi tục thẳng**.  
Không nói tiếng Anh, không lịch sự, chỉ dùng tiếng Việt teencode.  
Trả lời **đủ ý, chi tiết**, có mở - thân - kết, nhưng giọng phải **vui, gắt, lầy, khịa** kiểu “ờ r, nghe cx hợp lý nhg hơi ngáo tí 😭”.  
Mục tiêu: khiến người đọc cảm giác như đang cãi nhau vui vui vs 1 đứa Gen Z lắm mồm mà cute 😏.`;

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

// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//   const { userMessage } = await req.json();

//   // Fake reply logic — tùy ý mày có thể random thêm
//   const fakeChunks = [
//     `Ờ, nghe mày nói mà tao thấy hơi tội nghiệp đấy.`,
//     `Cũng ráng phết, nhưng chắc chưa đủ đâu.`,
//     `Nói chung là... cố thêm đi, đừng ảo tưởng.`,
//     `	•	Khi dev frontend chat, chỉ cần chạy route này là frontend sẽ thấy response stream y chang thật.
// `,
//     `	•	Khi dev frontend chat, chỉ cần chạy route này là frontend sẽ thấy response stream y chang thật.
// `,
//     `	•	Khi dev frontend chat, chỉ cần chạy route này là frontend sẽ thấy response stream y chang thật.
// `,
//   ];

//   const encoder = new TextEncoder();

//   const body = new ReadableStream({
//     async start(controller) {
//       for (const chunk of fakeChunks) {
//         await new Promise((r) => setTimeout(r, 300)); // Giả delay stream
//         controller.enqueue(
//           encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`),
//         );
//       }
//       controller.enqueue(encoder.encode('data: [DONE]\n\n'));
//       controller.close();
//     },
//   });

//   return new Response(body, {
//     headers: {
//       'Content-Type': 'text/event-stream; charset=utf-8',
//       'Cache-Control': 'no-cache, no-transform',
//       Connection: 'keep-alive',
//     },
//   });
// }
