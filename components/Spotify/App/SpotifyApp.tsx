'use client';
import SpotifyIcon from '@/assets/svg/spotify.svg';
import { BackDrop } from '@/components/Util/BackDrop';
import { Box } from '@/components/Util/Box';
import { useEffect, useRef, useState } from 'react';
import { spotifyApi } from '../action';
import { Avatar } from './Avatar';
import { Note } from './Note';
import { SearchInput } from './Search';
import { useInitApp } from '@/hooks/useInitApp';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [showNote, setShowNote] = useState(false);

  const { initPending } = useInitApp(() => {
    setShowNote(true);
  });

  return (
    <div ref={containerRef}>
      <BackDrop>
        {initPending && (
          <SpotifyIcon className='h-[180px] w-[180px] -translate-y-[50px]' />
        )}
        {showNote && <Note setShowNote={setShowNote} />}
      </BackDrop>
    </div>
  );
};
