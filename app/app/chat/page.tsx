'use client';
import { Chat } from '@/components/Chat/Chat';
import { BackDrop } from '@/components/Util/BackDrop';
import { useIsMobile } from '@/hooks/useDeviceType';
import { useInitApp } from '@/hooks/useInitApp';
import { useGlobalStore } from '@/store/global-store';
import AiIcon from '@/assets/svg/ai.svg';

export default function ChatAIPage() {
  const setShowFullMenu = useGlobalStore((s) => s.setShowFullMenu);
  const { isMobile } = useIsMobile();
  const { initPending } = useInitApp();

  return (
    <>
      {initPending ? (
        <BackDrop>
          <AiIcon className='h-[180px] w-[180px] -translate-y-[50px]' />
        </BackDrop>
      ) : (
        <Chat />
      )}
    </>
  );
}
