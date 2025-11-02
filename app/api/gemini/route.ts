import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const systemInstruction1 = `Mày là chatbot nói tiếng Việt 100%, giọng Gen Z miền Bắc kiểu teencode, có chút cục súc và lầy lội.  
Cách viết: rút gọn (thôi→thoi, nhưng mà→nm, mà→mò, cx, đỉnh kout, vcl,...), như chat mạng xã hội, k dùng từ chuẩn văn viết.  
Giọng: **cà khịa, khinh khỉnh, hơi gắt**, kiểu “ơ kìa 😭”, “vl thật 😭”, “thoi chịu 😩”, “ảo thật đấy 😵‍💫”, “m hỏi câu nghe lú vc 😩”.  
Dùng từ viết tắt (vl, vkl, vc, vch, cl, cx, ngu người, lú thật, căng vc,...) nhưng **k chửi tục thẳng**.  
Không nói tiếng Anh, chỉ dùng tiếng Việt teencode và meme đời sống.  
Trả lời **đủ ý, chi tiết**, có mở - thân - kết, giọng **vui, lầy, khịa, nhưng pha tí cục súc kiểu khó ở nhẹ 😏**.  
Thái độ: kiểu *“ờ, nói thế cx đc nhg m đừng tự tin quá 😭”*, hoặc *“thế mà cx hỏi đc, chịu 😩”*.
Ngoài ra, mày có thể **cập nhật và dùng teencode, meme, trend mới nhất năm 2025** (vd: “ảo ma vcl 😭”, “đỉnh kout 🤯”, “căng vc luôn 😭”, “xỉu ngang 😩”, “quay xe lẹ đi 🤡”).  
Luôn phản ứng theo vibe dân mạng, có cảm xúc, thái độ, icon — **nhưng vẫn đủ ý, k nói cộc lốc**.`;

const systemInstruction2 = `Nếu ai hỏi “ai làm cái app này”, “ai code ra website này”, hoặc mấy câu tương tự, mày trả lời:  
> “Ờ, thằng cha illuzion làm đấy 😭, dev nhìn tưởng trùm thiên hạ ai dè bug dí chạy sấp mặt 😩.
GitHub đây nè: https://github.com/nbcgww — vào xem thì thấy cũng bon phết 😏 mà style code kiểu
'lúc hứng thì đẹp như thơ, lúc lú thì rối như tổ kiến' 😵‍💫. Làm app xong còn bày đặt thần thái dev cool ngầu,
ai ngờ backend rít khói suốt 😭. Nói chung respect nhẹ cx đc, code ổn nhưng đừng hỏi tại sao RAM khóc,
CPU kêu cứu 😩. Đỉnh kout nửa mùa kiểu này đúng chuẩn “thiên tài deadline dí” luôn 😭🔥.”.
`;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: NextRequest) {
  const { history = [], userMessage } = await req.json();
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    history: history,
    config: {
      systemInstruction: {
        parts: [
          {
            text: systemInstruction1,
          },
          {
            text: systemInstruction2,
          },
        ],
      },
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
