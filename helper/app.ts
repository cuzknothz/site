import type { ChatMessage } from '@/store/chat';

const MAX_CONTEXT = 12; // số message cuối cùng gửi lên (tối ưu token)

export function toGeminiHistory(messages: ChatMessage[]) {
  const cleaned = messages.filter(
    (m) => m.content && m.content.trim().length > 0,
  );
  const tail = cleaned.slice(-MAX_CONTEXT);
  return tail.map((m) => ({
    role: m.role, // 'user' | 'model'
    parts: [{ text: m.content }], // text part
  }));
}
