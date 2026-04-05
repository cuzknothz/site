import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const userMessage = typeof payload?.userMessage === 'string' ? payload.userMessage.trim() : '';

    if (!userMessage) {
      return NextResponse.json({ ok: false, error: 'Missing message content' }, { status: 400 });
    }

    const prompt = `Dựa vào tin nhắn sau, hãy đặt một tiêu đề ngắn gọn (tối đa 4-6 chữ), kiểu Gen Z bựa bựa, giật gân xíu cho cuộc trò chuyện (không cần dùng ngoặc kép hay giải thích gì thêm, chỉ in ra đoạn text tiêu đề).\n\nTin nhắn: "${userMessage}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const title = response.text?.trim()?.replace(/["']/g, '') || 'Chat nhảm';

    return NextResponse.json({ ok: true, title });
  } catch (error) {
    console.error('Error generating title:', error);
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
