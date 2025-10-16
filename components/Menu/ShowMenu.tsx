'use client';
import BrightToFront from '@/assets/svg/bright-to-front.svg';
import { useEffectNext } from '@/hooks/useEffectNext';
import { useGlobalStore } from '@/store/global-store';
import gsap from 'gsap';
import { useRef } from 'react';
import { Textz } from '../Util/Tezt';
import { useGSAP } from '@gsap/react';

export const ShowMenu = () => {
  const showMenuRef = useRef<HTMLButtonElement>(null);
  const setShowFullMenu = useGlobalStore((s) => s.setShowFullMenu);
  const showFullMenu = useGlobalStore((s) => s.showFullMenu);

  const onToggle = () => {
    setShowFullMenu(!showFullMenu);
  };

  useEffectNext(() => {
    const icon = showMenuRef.current?.querySelector('svg')!;
    gsap.to(icon, {
      rotate: showFullMenu ? 180 : 0,
      delay: 0,
    });
  }, [showFullMenu]);

  useGSAP(() => {
    gsap.from(showMenuRef.current, {
      translateY: 50,
      delay: 1.2,
    });
  });

  return (
    <button
      className='fixed right-1/2 bottom-[8px] flex translate-x-1/2 items-center gap-[5px] [&__svg]:text-[#00000030]'
      onClick={onToggle}
      ref={showMenuRef}
    >
      <BrightToFront />
      <div> {showFullMenu ? 'Hide' : 'Menu'}</div>
    </button>
  );
};
