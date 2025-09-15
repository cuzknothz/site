'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Textz } from './Util/Tezt';
import { useRef } from 'react';

export const Slashhhhhhhhhhhhhhhhhhhhhhhhh = () => {
  const slashRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.to(slashRef.current, {
      top: '-200vh',
      duration: 1,
    });
  });

  return (
    <div
      ref={slashRef}
      className='fixed top-[100vh] left-0 z-[10] h-[200vh] w-screen bg-[#000]'
    ></div>
  );
};
