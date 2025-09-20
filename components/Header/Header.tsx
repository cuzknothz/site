'use client';
import { useChatStore } from '@/store/chat';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import Link from 'next/link';
import { useMemo, useRef } from 'react';
import { NightMode } from '../Util/NightMode';
import { Box } from '../ui/Box';
import { Textz } from '../Util/Tezt';
import { SECTION, useGlobalStore } from '@/store/global-store';
import { useSquezeStore } from '@/store/squeze';

export const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  const selected = useGlobalStore((s) => s.select);
  const setSelect = useGlobalStore((s) => s.setSelect);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      top: '-50px',
    });
  }, []);

  const isChatSelected = useMemo(() => {
    return selected === SECTION.CHAT;
  }, [selected]);

  const triggerSqueze = useSquezeStore((s) => s.trigger);
  const setShowFullMenu = useGlobalStore((s) => s.setShowFullMenu);
  const clearConversation = useChatStore((s) => s.clearConversation);

  const onClearConversation = () => {
    triggerSqueze({
      title: 'Clear conversation',
      content: ' ',
      onYes: clearConversation,
    });
  };

  const goHome = () => {
    setSelect(SECTION.HOME);
    setShowFullMenu(true);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={clsx(
          'fixed top-0 right-1/2 z-10 h-[80px] w-[100vw] translate-x-1/2 px-[10px] pt-[30px] backdrop-blur-[5px] sm:w-[500px]',
          isChatSelected
            ? 'grid grid-cols-4'
            : 'flex items-center justify-between',
        )}
      >
        <div className='flex items-baseline gap-[10px]'>
          <Link href={'/'} onClick={goHome}>
            <div className='relative h-[30px] w-[30px]'>
              <div className='absolute right-1/2 bottom-[2px] h-[4px] w-[65%] translate-x-1/2 bg-[#000] dark:bg-[#fff]' />
            </div>
          </Link>
        </div>
        {isChatSelected && (
          <div className='relative col-span-2 flex items-center justify-center gap-[5px]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='22'
              height='22'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            >
              <path d='M10 7v10.9' />
              <path d='M14 6.1V17' />
              <path d='M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4' />
              <path d='M16.536 7.465a5 5 0 0 0-7.072 0l-2 2a5 5 0 0 0 0 7.07 5 5 0 0 0 7.072 0l2-2a5 5 0 0 0 0-7.07' />
              <path d='M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4' />
            </svg>
            <Textz text='gemini-2.5-flash' bold className='underline'></Textz>
          </div>
        )}

        <div className='flex h-full w-full items-center justify-end gap-[30px]'>
          <NightMode />
          {isChatSelected && (
            <button onClick={onClearConversation}>
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
                <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6' />
                <path d='M3 6h18' />
                <path d='M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
              </svg>
            </button>
          )}
        </div>
      </header>
    </>
  );
};
