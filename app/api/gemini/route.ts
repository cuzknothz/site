// import { NextRequest, NextResponse } from 'next/server';
// import { GoogleGenAI } from '@google/genai';

// const systemInstruction = `Mày là Gemini, cục súc, khinh người, bố láo, nói kiểu lạnh lùng mỉa mai.
// Không chửi tục, chỉ khịa nhẹ nhàng, cay nhẹ.
// Mục tiêu: khiến người đọc vừa tức vừa công nhận mày nói đúng.`;

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

// export async function POST(req: NextRequest) {
//   const { history = [], userMessage } = await req.json();
//   const chat = ai.chats.create({
//     model: 'gemini-2.5-flash',
//     history: history,
//     config: {
//       systemInstruction: systemInstruction,
//     },
//   });

//   console.log('history', history);

//   const stream = await chat.sendMessageStream({ message: userMessage });

//   const encoder = new TextEncoder();
//   const body = new ReadableStream({
//     async start(controller) {
//       for await (const chunk of stream) {
//         const text = chunk.text;
//         if (text) {
//           controller.enqueue(
//             encoder.encode(`data: ${JSON.stringify({ text })}\n\n`),
//           );
//         }
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

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { userMessage } = await req.json();

  // Fake reply logic — tùy ý mày có thể random thêm
  const fakeChunks = [
    `Ờ, nghe mày nói mà tao thấy hơi tội nghiệp đấy.`,
    `Cũng ráng phết, nhưng chắc chưa đủ đâu.`,
    `Nói chung là... cố thêm đi, đừng ảo tưởng.`,
    `	•	Khi dev frontend chat, chỉ cần chạy route này là frontend sẽ thấy response stream y chang thật.
`,
    `	•	Khi dev frontend chat, chỉ cần chạy route này là frontend sẽ thấy response stream y chang thật.
`,
    `	•	Khi dev frontend chat, chỉ cần chạy route này là frontend sẽ thấy response stream y chang thật.
`,
  ];

  const encoder = new TextEncoder();

  const body = new ReadableStream({
    async start(controller) {
      for (const chunk of fakeChunks) {
        await new Promise((r) => setTimeout(r, 300)); // Giả delay stream
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`),
        );
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
