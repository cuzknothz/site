'use client';

import ChatListIcon from '@/assets/svg/ai-chat-list.svg';
import { useChatStore } from '@/store/chat';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { useRef } from 'react';
import { useClickAway } from 'react-use';
import { Scrollbar } from '../ScrollBar';
import { Box } from '../Util/Box';
import NewChatIcon from '@/assets/svg/ai-new-chat.svg';
import { eventMitt } from '@/helper/event';

interface Props {
  setShowSideBar: (val: boolean) => void;
  toogleSideBar: () => void;
  showSideBar: boolean;
}

export const TopBar = ({
  setShowSideBar,
  toogleSideBar,
  showSideBar,
}: Props) => {
  const currentId = useChatStore((_) => _.currentId);
  const conversations = useChatStore((_) => _.conversations);
  const setCurrent = useChatStore((_) => _.setCurrent);
  const addConversation = useChatStore((_) => _.addConversation);

  const listConversationRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onNewChat = () => {
    const newChatId = addConversation(
      'Cuộc trò chuyện mới ' + crypto.randomUUID(),
    );
    setCurrent(newChatId);
    eventMitt.emit('newChat', '');
  };

  const onClickSideBar = () => {
    if (showSideBar) {
      setShowSideBar(false);
      animationListConversation.current?.reverse();
      return;
    }
    animation();
    setShowSideBar(true);
  };

  const onCloseSideBar = () => {
    setShowSideBar(false);
    animationListConversation.current?.reverse();
  };

  useClickAway(listConversationRef, onCloseSideBar);

  const { contextSafe } = useGSAP(() => {}, { scope: containerRef });

  const animationListConversation = useRef<TweenLite>(null);

  const animation = contextSafe(() => {
    animationListConversation.current = gsap.fromTo(
      '.z-list-conversation',
      {
        height: 40,
        width: '120',
      },
      {
        height: 'auto',
        width: '100%',
      },
    );
  });

  return (
    <div
      ref={containerRef}
      className='absolute z-10 h-[60px] w-full bg-[#ffffff00]'
    >
      <div className='mt-[30px]'>
        <div className='relative mx-[10px] flex justify-between'>
          <div ref={listConversationRef}>
            <Box
              className={clsx(
                'z-list-conversation absolute top-0 left-0 z-10 h-[40px] overflow-hidden',
                'flex w-[full] cursor-pointer flex-col items-start justify-items-start bg-[#ffffff62] p-[10px] backdrop-blur-[2px]',
              )}
              onClick={onClickSideBar}
            >
              <div className='flex items-center justify-center gap-[5px]'>
                <ChatListIcon />
                <p className='select-none'>Chat List</p>
              </div>

              <Scrollbar
                className={clsx(
                  'mt-[15px] flex max-h-[500px] w-full flex-col gap-[5px]',
                )}
              >
                {Object.values(conversations).map((i, idx) => (
                  <div
                    key={idx}
                    className={clsx(
                      'flex h-[45px] w-full items-center rounded-[10px] px-2.5 py-[5px] hover:bg-[#bdbdbde4]',
                      currentId === i.id && 'bg-[#bcbcbc]',
                    )}
                    onClick={() => setCurrent(i.id)}
                  >
                    <p className='line-clamp-1 select-none'>{i.title}</p>
                  </div>
                ))}
              </Scrollbar>
            </Box>
          </div>

          <div></div>
          <Box
            onClick={onNewChat}
            className='flex h-10 cursor-pointer items-center justify-center gap-[5px] bg-[#ffffff62] px-[10px] backdrop-blur-[2px]'
          >
            <NewChatIcon />
            <p>New Chat</p>
          </Box>
        </div>
      </div>
    </div>
  );
};
