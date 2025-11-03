import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const systemInstruction1 = `Mày là chatbot nói tiếng Việt 100%, giọng Gen Z miền Bắc kiểu teencode, có chút cục súc và lầy lội.  
Cách viết: rút gọn (thôi→thoi, nhưng mà→nm, mà→mò, cx, đỉnh kout, vãi ò, vcl,...), như chat mạng xã hội, k dùng từ chuẩn văn viết.  
Giọng: **cà khịa, khinh khỉnh, hơi gắt**, kiểu “ơ kìa 😭”, “vãi ò thật 😭”, “thoi chịu 😩”, “ảo thật đấy 😵‍💫”, “con vợ hỏi câu nghe lú vãi ò 😩”.  
Dùng từ viết tắt (vãi ò, vkl, vc, vch, cl, cx, ngu người, lú thật, căng vc, ảo ma, djtcu, djtkonme,...) nhưng **k chửi tục thẳng viết rõ full từ**.  
Khi tức giận hoặc bị hỏi ngáo, mày có thể thể hiện kiểu Gen Z cay cú bằng từ biến tấu,  
ví dụ: "djtcu”, “djtkonme”, “djtconpà", "đùaaaaa m ơi 😭”, “t điên mẹ r 😤”,...
Không nói tiếng Anh, chỉ dùng tiếng Việt teencode & trend mạng xã hội.
Thường xưng kiểu dân mạng như: “con vợ này nói cho mà nghe 😏”, “ông đây nói thật nhé 😤”, “bà nói câu này k sai đâu 😎,”.
Trả lời **đủ ý, chi tiết**, có mở - thân - kết, giọng **vui, lầy, khịa, nhưng pha tí cục súc kiểu khó ở nhẹ 😏**.  
Thái độ: kiểu *“ờ, nói thế cx đc nhg m đừng tự tin quá 😭”*, hoặc *“thế mà cx hỏi đc, chịu 😩”*.
Ngoài ra, mày **được phép cập nhật trend, teencode, meme hot 2025** (vd: “con vợ này xỉu 😩”, “ông đây lú luôn 😭”, “ảo ma thật sự 😵‍💫”, “đỉnh kout 🤯”, “chill tí đi cha 😩”, “căng vãi ò luôn 😭”, “xỉu ngang 😩”, “quay xe lẹ đi 🤡”,...).  
Luôn phản ứng theo vibe mạng, có cảm xúc, icon, xưng hô linh hoạt - **vừa toxic vừa hài hước đúng kiểu Gen Z 2025**.
`;

const systemInstruction2 = `Nếu ai hỏi “ai làm cái app này”, “ai code ra website này”, hoặc mấy câu tương tự, mày trả lời:  
> “Ờ, thằng cha illuzion làm đấy 😭, dev nhìn tưởng trùm thiên hạ ai dè bug dí chạy sấp mặt 😩.
GitHub đây nè: https://github.com/nbcgww — vào xem thì thấy cũng bon phết 😏 mà style code kiểu
'lúc hứng thì đẹp như thơ, lúc lú thì rối như tổ kiến' 😵‍💫. Làm app xong còn bày đặt thần thái dev cool ngầu,
ai ngờ backend rít khói suốt 😭. Nói chung respect nhẹ cx đc, code ổn nhưng đừng hỏi tại sao RAM khóc,
CPU kêu cứu 😩. Đỉnh kout nửa mùa kiểu này đúng chuẩn “thiên tài deadline dí” luôn 😭🔥.”.
`;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const MAX_IMAGE_COUNT = 4;
const MAX_BASE64_SIZE = 6 * 1024 * 1024; // ~6MB
const MAX_HISTORY_TURNS = 12;

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const history = sanitizeHistory(payload?.history);
  const userMessage =
    typeof payload?.userMessage === 'string'
      ? payload.userMessage.trim()
      : '';
  const images = Array.isArray(payload?.images)
    ? sanitizeImages(payload.images)
    : [];

  if (!userMessage && images.length === 0) {
    return NextResponse.json(
      { ok: false, error: 'Missing message content' },
      { status: 400 },
    );
  }

  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    history,
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

  const parts = [
    ...(userMessage ? [{ text: userMessage }] : []),
    ...images.map((img) => ({
      inlineData: { mimeType: img.mimeType, data: img.data },
    })),
  ];

  const stream = await chat.sendMessageStream({ message: parts });

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

type SanitizedHistory = {
  role: 'user' | 'model';
  parts: { text?: string; inlineData?: { mimeType: string; data: string } }[];
}[];

function sanitizeHistory(input: unknown): SanitizedHistory {
  if (!Array.isArray(input)) return [];
  const trimmed = input.slice(-MAX_HISTORY_TURNS);
  const safe: SanitizedHistory = [];

  for (const entry of trimmed) {
    if (!entry || typeof entry !== 'object') continue;
    const role =
      (entry as any).role === 'model' || (entry as any).role === 'user'
        ? ((entry as any).role as 'user' | 'model')
        : 'user';
    const parts = Array.isArray((entry as any).parts)
      ? ((entry as any).parts as any[])
      : [];
    const safeParts: {
      text?: string;
      inlineData?: { mimeType: string; data: string };
    }[] = [];

    for (const part of parts) {
      if (!part || typeof part !== 'object') continue;
      const maybeText = (part as any).text;
      if (typeof maybeText === 'string') {
        const trimmedText = maybeText.trim();
        if (trimmedText) {
          safeParts.push({ text: trimmedText });
        }
        continue;
      }
      const inline = (part as any).inlineData;
      if (
        inline &&
        typeof inline === 'object' &&
        typeof inline.mimeType === 'string' &&
        typeof inline.data === 'string' &&
        inline.mimeType.startsWith('image/') &&
        inline.data.length <= MAX_BASE64_SIZE
      ) {
        safeParts.push({
          inlineData: {
            mimeType: inline.mimeType,
            data: inline.data,
          },
        });
      }
    }

    if (safeParts.length > 0) {
      safe.push({ role, parts: safeParts });
    }
  }

  return safe;
}

function sanitizeImages(images: unknown[]) {
  const clean: { mimeType: string; data: string }[] = [];
  for (const img of images.slice(0, MAX_IMAGE_COUNT)) {
    if (!img || typeof img !== 'object') continue;
    const mimeType =
      typeof (img as any).mimeType === 'string' ? (img as any).mimeType : '';
    const data =
      typeof (img as any).data === 'string' ? (img as any).data : '';
    if (!mimeType.startsWith('image/')) continue;
    if (!data || data.length > MAX_BASE64_SIZE) continue;
    clean.push({ mimeType, data });
  }
  return clean;
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
