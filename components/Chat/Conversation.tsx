import { useChatStore } from '@/store/chat';
import { Box } from '../ui/Box';
import { useGlobalStore } from '@/store/global-store';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { Textz } from '../Util/Tezt';

export const Conversation = () => {
  const list = useChatStore((s) => s.list);
  const showFullMenu = useGlobalStore((s) => s.showFullMenu);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // containerRef.current!.scrollIntoView(false);
    containerRef.current!.scrollTop = containerRef.current!.scrollHeight;
  }, [list.length]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        'flex w-full flex-col overflow-y-scroll px-[30px] duration-500',
        showFullMenu ? 'h-[calc(100dvh-308px)]' : 'h-[calc(100dvh-237px)]',
      )}
    >
      {list.map((i) => (
        <>
          <div></div>
          <div>
            {i.user && (
              <div className='flex w-full justify-end'>
                <Box className='inline justify-end !border-0 bg-[#e4e4e4] px-[20px] py-[10px] dark:bg-[#616161]'>
                  {i.user}
                </Box>
              </div>
            )}
          </div>
          <div>
            {i.bot && (
              <div className='flex w-full justify-start'>
                <Box className='inline justify-end !border-0 bg-transparent py-[10px]'>
                  <Textz text={i.bot} chars=' ' />
                </Box>
              </div>
            )}
          </div>
        </>
      ))}
    </div>
  );
};
