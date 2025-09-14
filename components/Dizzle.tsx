'use client';
import RabbitIcon from '@/assets/svg/rabbit.svg';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { NightMode } from './Util/NightMode';
import Image from 'next/image';
import Link from 'next/link';

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
      {/* <SunIcon /> */}
      {/* <RabbitIcon /> */}
      <Link href={'/'}>
        <Image
          src={'/web-app-manifest-192x192.png'}
          alt=''
          width={30}
          height={30}
          className='translate-y-[-5px] dark:invert'
        />
      </Link>
      <div>
        <NightMode />
      </div>
    </header>
  );
};
