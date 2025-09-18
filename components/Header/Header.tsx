'use client';
import { useChatStore } from '@/store/chat';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import Link from 'next/link';
import { useRef } from 'react';
import { NightMode } from '../Util/NightMode';

export const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isFullScreen = useChatStore((state) => state.fullScreen);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      top: '-50px',
    });
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={clsx(
          'fixed top-0 right-1/2 z-10 flex h-[80px] w-[100vw] translate-x-1/2 items-center justify-between px-[30px] pt-[30px] backdrop-blur-[5px] sm:w-[500px]',
          isFullScreen && 'hidden',
        )}
      >
        <Link href={'/'}>
          <div className='relative h-[30px] w-[30px]'>
            <div className='absolute right-1/2 bottom-[2px] h-[4px] w-[65%] translate-x-1/2 bg-[#000] dark:bg-[#fff]' />
          </div>
        </Link>
        <div>
          <NightMode />
        </div>
      </header>
    </>
  );
};
