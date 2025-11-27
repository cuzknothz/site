'use client';
import { BackDrop } from '@/components/Util/BackDrop';
import { Box } from '@/components/Util/Box';
import { useInitApp } from '@/hooks/useInitApp';
import { useGlobalStore } from '@/store/global-store';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { Avatar } from './Avatar';
import { Header } from './Header';
import { MainDivision } from './MainDivision';
import { SideBar } from './SideBar';

const LoginWith = () => {
  return (
    <BackDrop>
      <Box className='w-[300px] p-2.5'>
        <div className='flex flex-col items-center'>
          <Avatar className='w-[50px]' />
          <p>nbacuong</p>
        </div>
        <Box className='mt-5 bg-[#92d7f7] p-[5px] text-center'>
          Login with your Spotify account instead
        </Box>
        <p className='mt-[5px] text-[11px] text-red-500'>
          * Cần tài khoản Spotify Premium mới có thể play được nhạc
        </p>
      </Box>
    </BackDrop>
  );
};

export const SpotifyApp = () => {
  const showFullMenu = useGlobalStore((s) => s.showFullMenu);

  const containerRef = useRef<HTMLDivElement>(null);
  const [showNote, setShowNote] = useState(false);

  const [newRelease, setNewRelease] = useState([]);

  const [categories, setCategories] = useState([]);
  const [hotArtistsTopTracks, setHotArtistsTopTracks] = useState({});

  const { initPending } = useInitApp(() => {
    setShowNote(true);
  });

  return (
    <div
      ref={containerRef}
      className='fixed top-0 left-0 h-dvh w-screen bg-[black]'
    >
      {/* {initPending && (
        <BackDrop>
          <SpotifyIcon className='h-[180px] w-[180px] -translate-y-[50px]' />
        </BackDrop>
      )} */}
      {/* {showNote && (
        <BackDrop>
          <Note setShowNote={setShowNote} />
        </BackDrop>
      )} */}
      <Header />
      <div
        className={clsx(
          'flex gap-[8px] duration-500 mx-[5px]',
          showFullMenu ? 'h-[calc(100dvh-170px)]' : 'h-[calc(100dvh-100px)]',
        )}
      >
        <SideBar />
        <MainDivision />
      </div>
    </div>
  );
};
