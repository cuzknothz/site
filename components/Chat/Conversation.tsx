import { useMutationObserver } from '@/hooks/useMutationObserver';
import { useChatStore } from '@/store/chat';
import { useGlobalStore } from '@/store/global-store';
import clsx from 'clsx';
import { Activity, Fragment, useEffect, useRef } from 'react';
import { Scrollbar } from '../ScrollBar';
import { Box } from '../ui/Box';
import { Textz } from '../Util/Tezt';
import { TextFromMe } from './TextFromMe';

export const Conversation = () => {
  const list = useChatStore((s) => s.list);
  const showFullMenu = useGlobalStore((s) => s.showFullMenu);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // containerRef.current!.scrollIntoView(false);
    containerRef.current!.scrollTop = containerRef.current!.scrollHeight;
  }, [list.length]);

  useMutationObserver(containerRef.current!, () => {
    console.log('NEED SCROLL');
  });

  return (
    <Scrollbar className='h-dvh max-h-screen pb-[250px] pt-[80px]' autoHide={true}>
      <div
        ref={containerRef}
        className={clsx('flex w-full flex-col px-[15px] duration-500')}
      >
        {list.map((i, idx) => (
          <Fragment key={idx}>
            <div></div>
            <div>
              {i.user && (
                <Activity mode='visible'>
                  <TextFromMe text={i.user} />{' '}
                </Activity>
              )}
            </div>
            <div>
              {i.bot && (
                <div className='flex w-full justify-start'>
                  <Box className='inline justify-end border-0! bg-transparent py-2.5'>
                    <Textz text={i.bot} chars=' ' />
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
