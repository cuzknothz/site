'use client';
import RabbitIcon from '@/assets/svg/rabbit.svg';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { NightMode } from './Util/NightMode';
import Link from 'next/link';
import { CommingEvent } from './EventComming';

export const Dizzle = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      top: '-50px',
    });
  }, []);

  return (
    <header
      ref={headerRef}
      className='fixed top-0 right-1/2 z-10 flex h-[80px] w-[100vw] translate-x-1/2 items-center justify-between px-[30px] pt-[30px] backdrop-blur-[5px] sm:w-[500px]'
    >
      <div className='absolute top-[10px] left-0 mx-[30px] [&__*]:text-[13px]'>
        <CommingEvent />
      </div>

      <Link href={'/'}>
        <div className='relative h-[30px] w-[30px]'>
          <div className='absolute right-1/2 bottom-[2px] h-[4px] w-[65%] translate-x-1/2 bg-[#000] dark:bg-[#fff]' />
        </div>
      </Link>
      <div>
        <NightMode />
      </div>
    </header>
  );
};
