'use client';
import AiIcon from '@/assets/svg/ai-white.svg';
import { useMutationObserver } from '@/hooks/useMutationObserver';
import { useChatStore } from '@/store/chat';
import clsx from 'clsx';
import { Fragment, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
  const bottomRef = useRef<HTMLDivElement>(null);

  useMutationObserver(containerRef.current!, () => {});

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, currentId, thinking]);

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
                  <div className='flex w-full justify-start pr-10 hover:pr-0'>
                    <Box className='inline justify-end border-0! bg-transparent py-2.5'>
                      {i.content && (
                        <div className='w-full overflow-hidden flex flex-col gap-2 [&_a]:text-blue-500 [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-gray-500 [&_blockquote]:pl-2 [&_code]:rounded [&_code]:bg-[#e0e0e0] [&_code]:px-1 [&_code]:text-[#d21616] [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-bold [&_ol]:ml-4 [&_ol]:list-decimal [&_pre]:overflow-x-auto [&_pre]:rounded [&_pre]:bg-[#e0e0e0] [&_pre]:p-2 [&_pre_code]:bg-transparent [&_pre_code]:text-black [&_table]:w-full [&_table]:border-collapse [&_table]:border-gray-200 [&_td]:border [&_td]:border-gray-200 [&_td]:p-2 [&_th]:border [&_th]:border-gray-200 [&_th]:bg-gray-100 [&_th]:p-2 [&_ul]:ml-4 [&_ul]:list-disc dark:[&_code]:bg-[#333] dark:[&_code]:text-[#ff4d4d] dark:[&_pre]:bg-[#333] dark:[&_pre_code]:text-white dark:[&_th]:bg-gray-800'>
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {i.content}
                          </ReactMarkdown>
                        </div>
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
        <div ref={bottomRef} className='h-4' />
      </div>
    </Scrollbar>
  );
};
