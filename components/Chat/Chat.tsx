'use client';
import { useEffectNext } from '@/hooks/useEffectNext';
import { useGlobalStore } from '@/store/global-store';
import clsx from 'clsx';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { ChatArea } from './ChatArea';
import { Conversation } from './Conversation';
import { TopBar } from './TopBar';
import { NewChatAppend } from './NewChatAppend';

export const Chat = () => {
  const showFullMenu = useGlobalStore((s) => s.showFullMenu);

  const [showSideBar, setShowSideBar] = useState(false);

  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(chatAreaRef.current, {
      bottom: showFullMenu ? 110 : 40,
      delay: showFullMenu ? 0 : 0.1,
    });
  }, [showFullMenu]);

  return (
    <div>
      <div
        className={clsx(
          'fixed top-0 right-1/2 flex h-dvh w-full max-w-[800px] translate-x-1/2 sm:w-[80vw]',
        )}
      >
        <TopBar
          setShowSideBar={setShowSideBar}
          toogleSideBar={() => setShowSideBar((prev) => !prev)}
          showSideBar={showSideBar}
        />
        <div>
          <div className={clsx('absolute top-0 w-full')}>
            <Conversation />
          </div>

          <div ref={chatAreaRef} className={clsx('absolute w-full')}>
            <ChatArea />
          </div>
        </div>
        {/* <NewChatAppend/> */}
      </div>
    </div>
  );
};
