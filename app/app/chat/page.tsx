'use client';
import { Chat } from '@/components/Chat/Chat';
import { BackDrop } from '@/components/Util/BackDrop';
import { useIsMobile } from '@/hooks/useDeviceType';
import { useInitApp } from '@/hooks/useInitApp';
import { useGlobalStore } from '@/store/global-store';

export default function ChatAIPage() {
  const setShowFullMenu = useGlobalStore((s) => s.setShowFullMenu);
  const { isMobile } = useIsMobile();
  const { initPending } = useInitApp();

  return <>{initPending ? <BackDrop> dsfadf</BackDrop> : <Chat />}</>;
}
