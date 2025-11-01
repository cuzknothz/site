'use client';
import { useEffect, useRef, useState } from 'react';
import { Box } from '../ui/Box';
import { Textz } from '../Util/Tezt';
import { useChatStore } from '@/store/chat';
import clsx from 'clsx';
import { useGlobalStore } from '@/store/global-store';
import { useEffectNext } from '@/hooks/useEffectNext';
import gsap from 'gsap';
import { ChatArea } from './ChatArea';
import { Conversation } from './Conversation';
import { SideBar } from './SideBar';

export const Chat = () => {
  const [chatInput, setChatInput] = useState<string>('');
  const showFullMenu = useGlobalStore((s) => s.showFullMenu);

  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(chatAreaRef.current, {
      bottom: showFullMenu ? 110 : 40,
      delay: showFullMenu ? 0 : 0.1,
    });
  }, [showFullMenu]);

  useEffectNext(() => {
    if (!chatInput) {
      return;
    }
  }, [chatInput]);

  return (
    <div
      className={clsx(
        'fixed top-0 right-1/2 flex h-dvh w-full translate-x-1/2 sm:w-[500px]',
      )}
    >
      {/* <SideBar /> */}
      <div>
        {/* <div className='z-999 h-[50px] w-full bg-white backdrop-blur-[5px]'>
          dsahkjflsdjf
        </div> */}
        <div className={clsx('absolute top-0 w-full pt-5')}>
          <Conversation />
        </div>

        <div ref={chatAreaRef} className={clsx('absolute w-full')}>
          <ChatArea />
        </div>
      </div>
    </div>
  );
};
