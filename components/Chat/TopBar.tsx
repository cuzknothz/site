'use client';

import { useChatStore } from '@/store/chat';
import clsx from 'clsx';
import { useRef } from 'react';
import { useClickAway } from 'react-use';
import { Scrollbar } from '../ScrollBar';
import { Box } from '../ui/Box';

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

  const onNewChat = () => {
    const newChatId = addConversation(
      'Cuộc trò chuyện mới ' + crypto.randomUUID(),
    );
    setCurrent(newChatId);
  };

  const onClickSideBar = () => {
    // if (showSideBar) {
    //   return;
    // } else {
    toogleSideBar();
    // }
  };

  const chatsRef = useRef<HTMLDivElement>(null);

  useClickAway(chatsRef, () => setShowSideBar(false));
  return (
    <div className='absolute z-10 h-[60px] w-full bg-[#ffffff00]'>
      <div className='mt-[25px]'>
        <div className='flex w-full justify-between px-[10px]'>
          <div ref={chatsRef}>
            <Box
              className={clsx(
                'flex w-[full] cursor-pointer flex-col items-start justify-items-start bg-[#ffffff62] p-[10px] backdrop-blur-[2px]',
                showSideBar && 'bg-[#fff]!',
              )}
              onClick={onClickSideBar}
            >
              <div className='flex items-center justify-center gap-[5px]'>
                <button className='cursor-pointer'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <rect width='18' height='18' x='3' y='3' rx='2' />
                    <path d='M12 3v18' />
                  </svg>
                </button>
                <p className='select-none'>List Chat</p>
              </div>

              <Scrollbar
                className={clsx(
                  'mt-[15px] flex max-h-[500px] w-[200px] flex-col gap-[5px] sm:w-[300px]',
                  !showSideBar && 'hidden',
                )}
              >
                {Object.values(conversations).map((i, idx) => (
                  <div
                    key={idx}
                    className={clsx(
                      'flex h-[40px] w-full items-center rounded-[10px] px-[10px] py-[5px] hover:bg-[#bdbdbde4]',
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
            className='flex h-[40px] items-center justify-center gap-[5px] bg-[#ffffff62] px-[10px] backdrop-blur-[2px]'
          >
            <button>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                color='#000000'
              >
                <path
                  d='M10 7L9.48415 8.39405C8.80774 10.222 8.46953 11.136 7.80278 11.8028C7.13603 12.4695 6.22204 12.8077 4.39405 13.4842L3 14L4.39405 14.5158C6.22204 15.1923 7.13603 15.5305 7.80278 16.1972C8.46953 16.864 8.80774 17.778 9.48415 19.6059L10 21L10.5158 19.6059C11.1923 17.778 11.5305 16.864 12.1972 16.1972C12.864 15.5305 13.778 15.1923 15.6059 14.5158L17 14L15.6059 13.4842C13.778 12.8077 12.864 12.4695 12.1972 11.8028C11.5305 11.136 11.1923 10.222 10.5158 8.39405L10 7Z'
                  stroke='#000000'
                  strokeWidth='2'
                  strokeLinejoin='bevel'
                ></path>
                <path
                  d='M18 3L17.7789 3.59745C17.489 4.38087 17.3441 4.77259 17.0583 5.05833C16.7726 5.34408 16.3809 5.48903 15.5975 5.77892L15 6L15.5975 6.22108C16.3809 6.51097 16.7726 6.65592 17.0583 6.94167C17.3441 7.22741 17.489 7.61913 17.7789 8.40255L18 9L18.2211 8.40255C18.511 7.61913 18.6559 7.22741 18.9417 6.94166C19.2274 6.65592 19.6191 6.51097 20.4025 6.22108L21 6L20.4025 5.77892C19.6191 5.48903 19.2274 5.34408 18.9417 5.05833C18.6559 4.77259 18.511 4.38087 18.2211 3.59745L18 3Z'
                  stroke='#000000'
                  strokeWidth='2'
                  strokeLinejoin='bevel'
                ></path>
              </svg>

              {/* <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
          
                role='img'
                color='#000000'
              >
                <path
                  d='M10.7024 6.75H9.29761L8.78249 8.14208C8.08325 10.0317 7.7991 10.7535 7.27631 11.2763C6.75353 11.7991 6.03174 12.0833 4.14208 12.7825L2.75 13.2976V14.7024L4.14208 15.2175C6.03174 15.9167 6.75353 16.2009 7.27631 16.7237C7.7991 17.2465 8.08325 17.9683 8.78249 19.8579L9.29761 21.25H10.7024L11.2175 19.8579C11.9167 17.9683 12.2009 17.2465 12.7237 16.7237C13.2465 16.2009 13.9683 15.9167 15.8579 15.2175L17.25 14.7024V13.2976L15.8579 12.7825C13.9683 12.0833 13.2465 11.7991 12.7237 11.2763C12.2009 10.7535 11.9167 10.0317 11.2175 8.14208L10.7024 6.75Z'
                  fill='#000000'
                ></path>
                <path
                  d='M18.7031 2.75H17.3008L17.0804 3.34557C16.7677 4.19067 16.6767 4.39057 16.5346 4.53264C16.3925 4.67472 16.1926 4.76573 15.3475 5.07845L14.752 5.29883V6.70117L15.3475 6.92155C16.1926 7.23427 16.3925 7.32528 16.5346 7.46735C16.6767 7.60943 16.7677 7.80933 17.0804 8.65443L17.3008 9.25L18.7031 9.25L18.9235 8.65443C19.2362 7.80933 19.3272 7.60943 19.4693 7.46735C19.6114 7.32528 19.8113 7.23427 20.6564 6.92155L21.252 6.70117L21.252 5.29883L20.6564 5.07845C19.8113 4.76573 19.6114 4.67472 19.4693 4.53264C19.3272 4.39057 19.2362 4.19067 18.9235 3.34557L18.7031 2.75Z'
                  fill='#000000'
                ></path>
              </svg> */}
            </button>
            <p>New Chat</p>
          </Box>
        </div>
      </div>
    </div>
  );
};
