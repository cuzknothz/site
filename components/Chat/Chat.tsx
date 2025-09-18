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
          'absolute w-full',
          isFullScreen ? 'bottom-[40px]' : 'bottom-[110px]',
        )}
      >
        <Box className='relative !w-full flex-1 overflow-hidden'>
          <textarea
            value={chatInput}
            onChange={(e) => {
              setChatInput(e.target.value);
            }}
            className='field-sizing-content max-h-[200px] w-full resize-none p-[10px] px-[15px] focus:outline-0'
            placeholder='Ask anything'
          />
          <div className='flex w-full justify-between p-[0px_10px_10px_10px]'>
            <Box className='right-[10px] bottom-[10px] flex h-[40px] w-[40px] items-center justify-center'>
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
                <path d='M5 12h14' />
                <path d='M12 5v14' />
              </svg>
            </Box>
            <Box className='bottom-[10px] left-[10px] flex h-[40px] w-[40px] items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
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
          </div>
        </Box>
      </div>
    </div>
  );
};
