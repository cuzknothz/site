import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: { icon: '/favicon/app/chat-ai.svg' },
};

export default function ChatAppLayout({ children }: { children: React.ReactNode }) {
  return children as any;
}
