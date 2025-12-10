'use client';

import { useGlobalStore } from '@/store/global';
import { Header } from './components/Header';
import clsx from 'clsx';
import { SideBar } from './components/SideBar';
import { MainDivision } from './components/MainDivision';
import localFont from 'next/font/local';
import { ReactNode, useRef } from 'react';
import { NavBar } from './components/Small/NavBar';

interface Props {
  children: ReactNode;
}

const spotifyFont = localFont({
  src: [
    {
      path: './font/SpotifyMixUI-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './font/SpotifyMixUI-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
});
export const LayoutNext = ({ children }: Props) => {
  const showFullMenu = useGlobalStore((s) => s.showFullMenu);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={spotifyFont.className}>
      <div className='**:text-[13px] **:text-[#B3B3B3] lg:**:text-[15px]'>
        <div
          ref={containerRef}
          className='fixed top-0 left-0 h-dvh w-screen bg-[black]'
        >
          <Header />
          <div
            className={clsx(
              'mx-[5px] flex gap-2 duration-500',
              showFullMenu
                ? 'h-[calc(100dvh-170px)]'
                : 'h-[calc(100dvh-100px)]',
            )}
          >
            <SideBar />
            <MainDivision>{children}</MainDivision>
            <NavBar />
          </div>
        </div>
      </div>
    </div>
  );
};
