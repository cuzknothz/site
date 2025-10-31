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
import { AppIcon } from '@/components/App/AppIcon';

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
          duration: 0.5,
          ease: 'bounce.out',
        },
      );
    },
    { scope: containerRef },
  );
  return (
    <BackDrop>
      <div ref={containerRef}>
        <Box className='grid w-auto grid-cols-4 gap-4 rounded-[30px] p-[12px] [&__svg]:h-6! [&__svg]:w-6!'>
          <AppIcon href={'/app/spotify'} name='Spotify'>
            <Spotify />
          </AppIcon>

          <AppIcon href={'/app/crafts'} name='Market'>
            <Market />
          </AppIcon>

          <AppIcon href={'/app/chat'} name='Chat AI'>
            <AI />
          </AppIcon>

          <AppIcon href={'/app/client-info'} name='FP'>
            <FingerPrint />
          </AppIcon>

          <AppIcon href={'/app/spectrogram'} name='Spek'>
            <WaveIcon />
          </AppIcon>
        </Box>
      </div>
    </BackDrop>
  );
}
