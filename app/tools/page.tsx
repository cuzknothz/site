'use client';
import { Box } from '@/components/ui/Box';
import Market from '@/assets/svg/market.svg';
import AI from '@/assets/svg/ai.svg';
import FingerPrint from '@/assets/svg/finger-print.svg';
import { BackDrop } from '@/components/Util/BackDrop';
import Spotify from '@/assets/svg/spotify.svg';
import Link from 'next/link';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import WaveIcon from '@/assets/svg/wave.svg';

export default async function WPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        {
          scale: 0,
        },
        {
          scale: 1,
          duration: 0.3,
          ease: 'bounce.out',
        },
      );
    },
    { scope: containerRef },
  );
  return (
    <BackDrop>
      <div ref={containerRef}>
        <Box className='grid w-auto grid-cols-4 gap-4 rounded-[30px] p-[15px] [&__svg]:h-6! [&__svg]:w-6!'>
          <Link
            href={'/app/spotify'}
            title='Spotify'
            className='flex flex-col items-center'
          >
            <Box className='flex h-[55px] w-[55px] items-center justify-center'>
              <Spotify />
            </Box>
            <p className='text-[13px]'>Spotify</p>
          </Link>
          <Link
            href={'/app/crafts'}
            title='Market'
            className='flex flex-col items-center'
          >
            <Box className='flex h-[55px] w-[55px] items-center justify-center gap-[5px]'>
              <Market />
            </Box>
            <p className='text-[13px]'>Market</p>
          </Link>
          <Link
            href={'/app/chat'}
            title='Chat AI'
            className='flex flex-col items-center'
          >
            <Box className='flex h-[55px] w-[55px] items-center justify-center'>
              <AI />
            </Box>
            <p className='text-[13px]'>Chat AI</p>
          </Link>
          <Link
            href={'/app/client-info'}
            title='FP'
            className='flex flex-col items-center'
          >
            <Box className='flex h-[55px] w-[55px] items-center justify-center'>
              <FingerPrint />
            </Box>
            <p className='text-[13px]'>FP</p>
          </Link>
          <Link
            href={'/app/spectrogram'}
            title='Spectrogram'
            className='flex flex-col items-center'
          >
            <Box className='flex h-[55px] w-[55px] items-center justify-center'>
              <WaveIcon />
            </Box>
            <p className='text-[13px]'>Spek</p>
          </Link>
        </Box>
      </div>
    </BackDrop>
  );
}
