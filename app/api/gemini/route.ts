import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: message,
  });

  return NextResponse.json({ text: response.text });
}
