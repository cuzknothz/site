'use client';
import { useState } from 'react';
import { Box } from '../ui/Box';
import { Textz } from '../Util/Tezt';
import { useChatStore } from '@/store/chat';
import clsx from 'clsx';

export const Chat = () => {
  const [chatInput, setChatInput] = useState<string>('');
  const isFullScreen = useChatStore((state) => state.fullScreen);

  return (
    <div
      className={clsx(
        'fixed top-0 right-1/2 h-[100dvh] w-full translate-x-1/2 sm:w-[500px]',
      )}
    >
      <div className='flex h-full w-full flex-col items-center justify-center gap-[10px] px-[20px]'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='80'
          height='80'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-width='1'
          stroke-linecap='round'
          stroke-linejoin='round'
        >
          <path d='M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2' />
          <path d='M6.453 15h11.094' />
          <path d='M8.5 2h7' />
        </svg>
        <Textz delay={1000} text='This feature is under development' />
      </div>
      <div
        className={clsx(
          'absolute flex w-full gap-[10px] px-[20px] duration-500',
          isFullScreen ? 'bottom-[30px]' : 'bottom-[90px]',
        )}
      >
        <Box className='flex h-[50px] w-[50px] cursor-pointer items-center justify-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path d='m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551' />
          </svg>
        </Box>

        <Box className='relative h-[50px] !w-full flex-1'>
          <input
            value={chatInput}
            onChange={(e) => {
              setChatInput(e.target.value);
            }}
            type='text'
            className='h-full w-full px-[15px] focus:outline-0'
            placeholder='Ask anything'
          />
          {chatInput && (
            <Box className='absolute right-[10px] bottom-1/2 flex h-[30px] w-[30px] translate-y-1/2 items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              >
                <path d='m5 12 7-7 7 7' />
                <path d='M12 19V5' />
              </svg>
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
};
