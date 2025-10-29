'use client';
import { Box } from '@/components/ui/Box';
import SpotifyIcon from '@/assets/svg/spotify.svg';
import Link from 'next/link';

export const SpotifyWidget = () => {
  return (
    <div>
      <Box className='relative flex h-[100px] w-full items-start justify-between gap-[10px] rounded-[25px]! p-[8px]'>
        <Box className='aspect-square h-full'>
          <div></div>
        </Box>
        <div className='flex h-full flex-1 flex-col justify-center'>
          <p className='font-bold'>Miracle</p>
          <p>Kovan, LaCreme</p>
        </div>
        <Link href={'/app/spotify'}>
          <button className='group cursor-pointer' title='Open in Spotify App'>
            <SpotifyIcon />
          </button>
        </Link>
      </Box>
    </div>
  );
};
