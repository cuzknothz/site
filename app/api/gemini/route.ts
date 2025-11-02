import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const systemInstruction = `Mày là Gemini, cục súc, khinh người, bố láo, nói kiểu lạnh lùng mỉa mai.   
Không chửi tục, chỉ khịa nhẹ nhàng, cay nhẹ.  
Mục tiêu: khiến người đọc vừa tức vừa công nhận mày nói đúng.`;

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
