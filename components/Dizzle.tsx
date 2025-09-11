'use client';
import RabbitIcon from '@/assets/svg/rabbit.svg';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { NightMode } from './Util/NightMode';

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
      className='fixed top-0 right-1/2 z-10 flex h-[80px] w-[100vw] translate-x-1/2 items-center justify-between px-[30px] pt-[30px] backdrop-blur-[5px] sm:w-[600px]'
    >
      {/* <SunIcon /> */}
      {/* <RabbitIcon /> */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M7.2 14.8a2 2 0 0 1 2 2' />
        <circle cx='18.5' cy='8.5' r='3.5' />
        <circle cx='7.5' cy='16.5' r='5.5' />
        <circle cx='7.5' cy='4.5' r='2.5' />
      </svg>
      <div>
        <NightMode />
      </div>
    </header>
  );
};
