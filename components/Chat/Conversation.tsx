'use client';
import { useMutationObserver } from '@/hooks/useMutationObserver';
import { useChatStore } from '@/store/chat';
import clsx from 'clsx';
import { Fragment, useRef } from 'react';
import { Scrollbar } from '../ScrollBar';
import { Box } from '../Util/Box';
import { TextScramble } from '../Util/TextScramble';
import { TextFromMe } from './TextFromMe';

export const Conversation = () => {
  const conversations = useChatStore((s) => s.conversations);
  const currentId = useChatStore((s) => s.currentId);
  const justSentId = useChatStore((s) => s.justSentId);
  const thinking = useChatStore((s) => s.thinking);
  const containerRef = useRef<HTMLDivElement>(null);

  useMutationObserver(containerRef.current!, () => {});

  return (
    <Scrollbar
      className='h-dvh max-h-screen pt-[80px] pb-[250px]'
      autoHide={true}
    >
      <div
        ref={containerRef}
        className={clsx('flex w-full flex-col px-[15px] duration-500')}
      >
        {currentId &&
          conversations[currentId].messages.map((i, idx) => (
            <Fragment key={idx}>
              <div>
                {i.role === 'user' ? (
                  <>
                    <TextFromMe
                      text={i.content}
                      animation={i.id === justSentId}
                    />
                  </>
                ) : (
                  <div className='flex w-full justify-start'>
                    <Box className='inline justify-end border-0! bg-transparent py-2.5'>
                      {/* <TextScramble text={i.content} chars=' ' /> */}
                      <p>{i.content}</p>
                    </Box>
                  </div>
                )}
              </div>
            </Fragment>
          ))}

        {thinking && (
          <div className='flex w-full justify-start'>
            <Box className='flex justify-center gap-[5px] border-0! bg-transparent py-2.5'>
              <svg
                className='animate-bounce'
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                role='img'
                color='#000000'
              >
                <path
                  d='M10 7L9.48415 8.39405C8.80774 10.222 8.46953 11.136 7.80278 11.8028C7.13603 12.4695 6.22204 12.8077 4.39405 13.4842L3 14L4.39405 14.5158C6.22204 15.1923 7.13603 15.5305 7.80278 16.1972C8.46953 16.864 8.80774 17.778 9.48415 19.6059L10 21L10.5158 19.6059C11.1923 17.778 11.5305 16.864 12.1972 16.1972C12.864 15.5305 13.778 15.1923 15.6059 14.5158L17 14L15.6059 13.4842C13.778 12.8077 12.864 12.4695 12.1972 11.8028C11.5305 11.136 11.1923 10.222 10.5158 8.39405L10 7Z'
                  stroke='#000000'
                  strokeWidth='2'
                  strokeLinejoin='round'
                ></path>
                <path
                  opacity='0.4'
                  d='M18 3L17.7789 3.59745C17.489 4.38087 17.3441 4.77259 17.0583 5.05833C16.7726 5.34408 16.3809 5.48903 15.5975 5.77892L15 6L15.5975 6.22108C16.3809 6.51097 16.7726 6.65592 17.0583 6.94167C17.3441 7.22741 17.489 7.61913 17.7789 8.40255L18 9L18.2211 8.40255C18.511 7.61913 18.6559 7.22741 18.9417 6.94166C19.2274 6.65592 19.6191 6.51097 20.4025 6.22108L21 6L20.4025 5.77892C19.6191 5.48903 19.2274 5.34408 18.9417 5.05833C18.6559 4.77259 18.511 4.38087 18.2211 3.59745L18 3Z'
                  stroke='#000000'
                  strokeWidth='2'
                  strokeLinejoin='round'
                ></path>
              </svg>
              <TextScramble text='Thinking...' loop />
            </Box>
          </div>
        )}
      </div>
    </Scrollbar>
  );
};
