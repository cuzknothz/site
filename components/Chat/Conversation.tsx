'use client';
import { useMutationObserver } from '@/hooks/useMutationObserver';
import { useChatStore } from '@/store/chat';
import clsx from 'clsx';
import { Activity, Fragment, useRef } from 'react';
import { Scrollbar } from '../ScrollBar';
import { Box } from '../ui/Box';
import { Textz } from '../Util/Tezt';
import { TextFromMe } from './TextFromMe';

export const Conversation = () => {
  const conversations = useChatStore((s) => s.conversations);
  const currentId = useChatStore((s) => s.currentId);
  const justSentId = useChatStore((s) => s.justSentId);

  console.log('currentId', currentId);

  console.log(currentId && conversations[currentId]);

  const containerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   // containerRef.current!.scrollIntoView(false);
  //   containerRef.current!.scrollTop = containerRef.current!.scrollHeight;
  // }, [list.length]);

  useMutationObserver(containerRef.current!, () => {
    console.log('NEED SCROLL');
  });

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
                      {/* <Textz text={i.content} chars=' ' /> */}
                      <p>{i.content}</p>
                    </Box>
                  </div>
                )}
              </div>
            </Fragment>
          ))}
      </div>
    </Scrollbar>
  );
};
