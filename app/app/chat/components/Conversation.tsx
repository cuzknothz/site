'use client';
import AiIcon from '@/assets/svg/ai-white.svg';
import { useMutationObserver } from '@/hooks/useMutationObserver';
import { useChatStore } from '@/store/chat';
import clsx from 'clsx';
import { Fragment, useRef } from 'react';
import { Scrollbar } from '@/components/ScrollBar';
import { Box } from '@/components/Util/Box';
import { TextScramble } from '@/components/Util/TextScramble';
import { TextFromMe } from './TextFromMe';

export const Conversation = () => {
  const conversations = useChatStore((s) => s.conversations);
  const currentId = useChatStore((s) => s.currentId);
  const justSentId = useChatStore((s) => s.justSentId);
  const thinking = useChatStore((s) => s.thinking);
  const containerRef = useRef<HTMLDivElement>(null);

  useMutationObserver(containerRef.current!, () => {});

  return (
    <Scrollbar className='h-dvh max-h-screen pt-20 pb-[250px]' autoHide={true}>
      <div
        ref={containerRef}
        className={clsx('flex w-full flex-col px-[15px] duration-500')}
      >
        {currentId &&
          conversations[currentId].messages.map((i, idx) => (
            <Fragment key={idx}>
              <div>
                {i.role === 'user' ? (
                  <TextFromMe
                    text={i.content}
                    images={i.images}
                    animation={i.id === justSentId}
                  />
                ) : (
                  <div className='flex w-full justify-start'>
                    <Box className='inline justify-end border-0! bg-transparent py-2.5'>
                      {i.content && (
                        <p className='whitespace-pre-line'>{i.content}</p>
                      )}
                      {i.images && i.images.length > 0 && (
                        <div className='mt-2 flex flex-wrap gap-2'>
                          {i.images.map((src, imgIdx) => (
                            <img
                              key={`${src}-${imgIdx}`}
                              src={src}
                              alt={`ai-attachment-${imgIdx + 1}`}
                              className='h-20 w-20 rounded-xl object-cover'
                            />
                          ))}
                        </div>
                      )}
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
