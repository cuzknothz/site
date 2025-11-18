'use client';
import ThreeChartIcon from '@/assets/svg/3chart.svg';
import AiIcon from '@/assets/svg/ai.svg';
import FingerPrintIcon from '@/assets/svg/finger-print.svg';
import SpekIcon from '@/assets/svg/spek.svg';
import SpotifyIcon from '@/assets/svg/spotify.svg';
import QRIcon from '@/assets/svg/qr.svg';
import { AppIcon } from '@/components/App/AppIcon';
import { BackDrop } from '@/components/Util/BackDrop';
import { Box } from '@/components/Util/Box';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import HTTPPieIcon from '@/assets/svg/httppie.svg';

export default function AppPage() {
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
      <div className='flex flex-col'>
        <div ref={containerRef}>
          <Box className='grid w-auto grid-cols-4 gap-4 rounded-[30px] p-3 [&__svg]:h-6! [&__svg]:w-6!'>
            <AppIcon href={'/app/chat'} name='Chat AI'>
              <AiIcon />
            </AppIcon>
            <AppIcon href={'/app/chart'} name='3Chart'>
              <ThreeChartIcon />
            </AppIcon>
            <AppIcon href={'/app/finger-print'} name='FP'>
              <FingerPrintIcon />
            </AppIcon>
            <AppIcon href={'/app/spotify'} name='Spotify'>
              <SpotifyIcon />
            </AppIcon>
            <AppIcon href={'/app/spectrogram'} name='Spek'>
              <SpekIcon />
            </AppIcon>

            <AppIcon href={'/app/qr-generator'} name='QR'>
              <QRIcon />
            </AppIcon>
            <AppIcon href={'/app/httppie'} name='HTTPPie'>
              <HTTPPieIcon />
            </AppIcon>
          </Box>
        </div>
      </div>
    </BackDrop>
  );
}
