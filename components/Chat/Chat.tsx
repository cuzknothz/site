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

export const Chat = () => {
  const [chatInput, setChatInput] = useState<string>('');
  const showFullMenu = useGlobalStore((s) => s.showFullMenu);

  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(chatAreaRef.current, {
      bottom: showFullMenu ? 110 : 40,
      delay: showFullMenu ? 0 : 0.6,
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
        'fixed top-0 right-1/2 h-dvh w-full translate-x-1/2 sm:w-[500px]',
      )}
    >
      <div className={clsx('absolute top-[100px] w-full')}>
        <Conversation />
      </div>

      <div ref={chatAreaRef} className={clsx('absolute w-full')}>
        <ChatArea />
      </div>
    </div>
  );
};
