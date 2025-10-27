'use client';

import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { gsap } from 'gsap';

export const InputBlink = () => {
  const slashRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useGSAP(() => {
    const inputWidth = inputRef.current?.clientWidth ?? 0;
    gsap.to(slashRef.current, {
      left: inputWidth + 10,
      //   yoyo: true,
      repeat: -1,
    });
  }, []);
  return (
    <div className='relative h-[35px] overflow-hidden'>
      <input
        ref={inputRef}
        type='text'
        placeholder='************'
        className='h-full w-full rounded-[5px] bg-[#92e3fecc] px-2.5 pt-[5px] focus:outline-0'
      />
      <div
        className='absolute -top-full left-[-50%] h-[100px] w-[50px] rotate-25 bg-white'
        ref={slashRef}
      ></div>
    </div>
  );
};
