'use client';
import BrightToFront from '@/assets/svg/bright-to-front.svg';
import { useEffectNext } from '@/hooks/useEffectNext';
import { useGlobalStore } from '@/store/global';
import gsap from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export const ShowMenu = () => {
  const showMenuRef = useRef<HTMLButtonElement>(null);
  const setShowFullMenu = useGlobalStore((s) => s.setShowFullMenu);
  const showFullMenu = useGlobalStore((s) => s.showFullMenu);
  const pathname = usePathname();

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
      delay: 0.8,
    });
  });
  const isSpotifyApp = pathname === '/app/spotify';

  return (
    <button
      className={clsx(
        'fixed right-1/2 bottom-2 z-20 flex translate-x-1/2 cursor-pointer items-center gap-[5px] [&__svg]:text-[#0000007d] dark:[&__svg]:text-[#656565]',
        isSpotifyApp && 'invert',
      )}
      onClick={onToggle}
      ref={showMenuRef}
    >
      <BrightToFront />
    </button>
  );
};
