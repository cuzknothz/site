'use client';

import ChatListIcon from '@/assets/svg/ai-chat-list.svg';
import { useChatStore } from '@/store/chat';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { useRef } from 'react';
import { useClickAway } from 'react-use';
import { Scrollbar } from '@/components/ScrollBar';
import { Box } from '@/components/Util/Box';
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
  const deleteConversation = useChatStore((_) => _.deleteConversation);
  const renameConversation = useChatStore((_) => _.renameConversation);

  const listConversationRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(() => {}, { scope: containerRef });

  const animationNewChatBtn = contextSafe(() => {
    gsap.fromTo(
      '.z-new-chat-btn',
      {
        scale: 0.8,
      },
      {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      },
    );
  });

  // const animationChatListBtn = contextSafe(() => {
  //   gsap.fromTo(
  //     '.z-chat-list-btn',
  //     {
  //       scale: 0.8,
  //     },
  //     {
  //       scale: 1,
  //       duration: 0.3,
  //       ease: 'power2.out',
  //     },
  //   );
  // });

  const onNewChat = () => {
    animationNewChatBtn();
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
    // animationChatListBtn();
    setShowSideBar(true);
  };

  const onRename = (e: React.MouseEvent, id: string, oldTitle: string) => {
    e.stopPropagation();
    const newTitle = prompt('Nhập tên cuộc trò chuyện mới:', oldTitle);
    if (newTitle && newTitle.trim() !== '') {
      renameConversation(id, newTitle.trim());
    }
  };

  const onDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Bạn có chắc chắn muốn xoá cuộc trò chuyện này?')) {
      deleteConversation(id);
    }
  };

  const onCloseSideBar = () => {
    setShowSideBar(false);
    animationListConversation.current?.reverse();
  };

  useClickAway(listConversationRef, onCloseSideBar);

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
        duration: 0.3,
        // ease: 'bounce.out',
      },
    );
  });

  return (
    <div
      ref={containerRef}
      className='absolute z-10 h-[60px] w-full bg-[#ffffff00]'
    >
      <div className='mt-[30px]'>
        <div className='relative mx-2.5 flex justify-between'>
          <div ref={listConversationRef}>
            <Box
              className={clsx(
                'z-list-conversation absolute top-0 left-0 z-10 h-10 overflow-hidden',
                'flex w-[full] cursor-pointer flex-col items-start justify-items-start bg-[#ffffffbc] p-2.5 backdrop-blur-[2px]',
              )}
              onClick={onClickSideBar}
            >
              <div
                className={clsx(
                  'z-chat-list-btn',
                  'flex items-center justify-center gap-[5px]',
                )}
              >
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
                      'group flex h-[45px] w-full items-center justify-between rounded-[10px] px-2.5 py-[5px] hover:bg-[#f0f0f0f2]',
                      currentId === i.id &&
                        'bg-[#bbff00ba] hover:bg-[#bbff00ba]!',
                    )}
                    onClick={() => setCurrent(i.id)}
                  >
                    <p className='line-clamp-1 flex-1 pr-2 select-none'>
                      {i.title}
                    </p>
                    <div className='hidden gap-2 group-hover:flex'>
                      <button
                        onClick={(e) => onRename(e, i.id, i.title)}
                        className='flex h-6 w-6 items-center justify-center rounded bg-gray-200 text-gray-700 hover:bg-gray-300'
                        title='Đổi tên'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='12'
                          height='12'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path d='M12 20h9' />
                          <path d='M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z' />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => onDelete(e, i.id)}
                        className='flex h-6 w-6 items-center justify-center rounded bg-red-100 text-red-600 hover:bg-red-200'
                        title='Xoá'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='12'
                          height='12'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path d='M3 6h18' />
                          <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                          <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                          <line x1='10' y1='11' x2='10' y2='17' />
                          <line x1='14' y1='11' x2='14' y2='17' />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </Scrollbar>
            </Box>
          </div>

          <div></div>
          <Box
            onClick={onNewChat}
            className={clsx(
              'z-new-chat-btn',
              'flex h-10 cursor-pointer items-center justify-center gap-[5px] px-2.5 backdrop-blur-[2px] hover:bg-[#bbff00ba] active:bg-[#ffff0046]',
            )}
          >
            <NewChatIcon />
            <p>New Chat</p>
          </Box>
        </div>
      </div>
    </div>
  );
};
