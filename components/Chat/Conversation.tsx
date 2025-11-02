'use client';
import { useMutationObserver } from '@/hooks/useMutationObserver';
import { useChatStore } from '@/store/chat';
import clsx from 'clsx';
import { Fragment, useRef } from 'react';
import { Scrollbar } from '../ScrollBar';
import { Box } from '../Util/Box';
import { TextScramble } from '../Util/TextScramble';
import { TextFromMe } from './TextFromMe';
import AiIcon from '@/assets/svg/ai-white.svg';

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
                      <p className='whitespace-pre-line'>{i.content}</p>
                    </Box>
                  </div>
                )}
              </div>
            </Fragment>
          ))}

        {thinking && (
          <div className='flex w-full justify-start'>
            <Box className='flex justify-center gap-[5px] border-0! bg-transparent py-2.5'>
              <AiIcon className='animate-bounce' />
              <TextScramble text='Thinking...' loop />
            </Box>
          </div>
        )}
      </div>
    </Scrollbar>
  );
};
