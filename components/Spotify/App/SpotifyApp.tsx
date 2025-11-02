'use client';
import { Box } from '@/components/Util/Box';
import { BackDrop } from '@/components/Util/BackDrop';
import { useEffect, useRef, useState } from 'react';
import { Avatar } from './Avatar';
import { Note } from './Note';
import { TextScramble } from '@/components/Util/TextScramble';
import { SearchInput } from './Search';
import { spotifyApi } from '../action';

const LoginWith = () => {
  return (
    <BackDrop>
      <Box className='w-[300px] p-[10px]'>
        <div className='flex flex-col items-center'>
          <Avatar className='w-[50px]' />
          <p>nbacuong</p>
        </div>
        <Box className='mt-[20px] bg-[#92d7f7] p-[5px] text-center'>
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
  const [showNote, setShowNote] = useState(true);

  useEffect(() => {
    spotifyApi.setAccessToken(
      'BQAwzxZGTcOrLqpKkSQht0oyezMyunpKCeciWdtaHzDrhyJa87Tz_h7zdcjTUb-PYFRYgaU6JyNYYvIJ7pIky8Vu_50ExJPkcIZmR0uPYxJKagdB5Z5nBl80ha-bxfi6o5rxiaj0S6U',
    );
    spotifyApi.searchTracks('artist:Love').then(
      function (data) {},
      function (err) {},
    );
  }, []);
  return (
    <div ref={containerRef}>
      {showNote && (
        <BackDrop>
          <Note setShowNote={setShowNote} />
        </BackDrop>
      )}

      {/* <LoginWith /> */}
      <div className='fixed top-0 left-0 h-dvh w-dvw px-[20px] pt-[30px]'>
        <div className='relative'>
          <SearchInput />
        </div>
        {/* <UnderDevelopment /> */}
      </div>
    </div>
  );
};
