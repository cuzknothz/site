'use client';
import { Chat } from '@/components/Chat/Chat';
import { useHiddenMenuNext } from '@/hooks/useHiddenMenuNext';

export default function ChatAIPage() {
  useHiddenMenuNext();

  return (
    <>
      <Chat />
    </>
  );
}
