'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Textz } from './Util/Tezt';

export const Slashhhhhhhhhhhhhhhhhhhhhhhhh = () => {
  useGSAP(() => {
    const loadingLines = document.querySelectorAll('.loading-line');

    loadingLines.forEach((line, index) => {
      gsap.to(line, {
        translateX: index % 2 === 0 ? 1000 : -1000,
        duration: 50,
        repeat: -1,
        ease: 'none',
      });
    });
  });

  return (
    <div className='fixed top-0 left-1/2 z-[1] h-screen w-[500px] -translate-x-1/2'>
      <div className='absolute right-1/2 bottom-1/2 flex translate-x-1/2 translate-y-1/2 rotate-[20deg] flex-col gap-[10px] bg-[#ffffff0c] backdrop-blur-[2px]'>
        {[...Array(100).keys()].map((i) => (
          <div key={i} className='loading-line w-max select-none'>
            {'loading...'.repeat(80)}
          </div>
        ))}
      </div>
    </div>
  );
};
