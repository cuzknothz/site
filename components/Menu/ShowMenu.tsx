'use client';
import BrightToFront from '@/assets/svg/bright-to-front.svg';
import { useGlobalStore } from '@/store/global-store';
import { useRef } from 'react';

export const ShowMenu = () => {
  const showMenuRef = useRef<HTMLButtonElement>(null);
  const setShowFullMenu = useGlobalStore((s) => s.setShowFullMenu);
  const showFullMenu = useGlobalStore((s) => s.showFullMenu);

  const onToggle = () => {
    setShowFullMenu(!showFullMenu);
  };

  return (
    <button
      className='fixed right-1/2 bottom-[5px] flex translate-x-1/2 items-center gap-[5px] opacity-[0.75]'
      onClick={onToggle}
      ref={showMenuRef}
    >
      <BrightToFront />
      <div> {showFullMenu ? 'Hide Menu' : 'Menu'}</div>
    </button>
  );
};
