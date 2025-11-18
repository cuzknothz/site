import type { ChatMessage } from '@/store/chat';

const MAX_CONTEXT = 12; // số message cuối cùng gửi lên (tối ưu token)

export function toGeminiHistory(messages: ChatMessage[]) {
  const cleaned = messages.filter((m) => {
    const hasText = m.content && m.content.trim().length > 0;
    const hasImages = m.images && m.images.length > 0;
    return hasText || hasImages;
  });
  const tail = cleaned.slice(-MAX_CONTEXT);
  return tail.map((m) => ({
    role: m.role, // 'user' | 'model'
    parts: buildParts(m), // text + inline images
  }));
}

function buildParts(message: ChatMessage) {
  const parts: {
    text?: string;
    inlineData?: { mimeType: string; data: string };
  }[] = [];
  const text = message.content?.trim();
  if (text) {
    parts.push({ text });
  }
  if (message.images?.length) {
    for (const src of message.images) {
      const match = src.match(/^data:(.*?);base64,(.+)$/);
      if (match) {
        const [, mimeType, data] = match;
        parts.push({
          inlineData: { mimeType, data },
        });
      }
    }
  }
  return parts.length > 0 ? parts : [{ text: '' }];
}
