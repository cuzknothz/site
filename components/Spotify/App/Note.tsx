'use client';

import { Box } from '@/components/Util/Box';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { useRef } from 'react';

interface NoteProps {
  setShowNote: (val: boolean) => void;
}
export const Note = ({ setShowNote }: NoteProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current,
      {
        scale: 0,
      },
      { scale: 1, duration: 0.3, ease: 'bounce.out' },
    );
  });
  return (
    <div ref={containerRef}>
      <Box className='w-[300px] p-[15px] pt-5!'>
        <p className='mb-2.5 text-center text-[13px]'>Note</p>
        <p>
          {'- Ứng dụng được xây dựng bằng Web API của Spotify '}
          <Link
            href={'https://developer.spotify.com/documentation/'}
            target='_blank'
            className='text-[#8400ff] underline'
          >
            {'(Spotify for Developer)'}
          </Link>
          {'.'}
        </p>
        <p>
          - Bạn có thể login bằng tài khoản của bạn. Để có thể Playback yêu cầu
          là tài khoản login phải là tài khoản Spotify Premium.
        </p>

        <p>
          {'- Develop by '}
          <Link
            href={'https://github.com/nbcgww'}
            target='_blank'
            className='text-[#8400ff] underline'
          >
            {'illuzion'}
          </Link>
          {'. Tôi không thu thập bất cứ thông tin gì từ bạn. Have fun :).'}
        </p>
        <Box
          onClick={() => setShowNote(false)}
          className='mt-[15px] flex h-10 cursor-pointer items-center justify-center rounded-[10px]! bg-[#b9f4fc] text-center hover:bg-[#66ff00] active:bg-[#abf888]'
        >
          OKey
        </Box>
      </Box>
    </div>
  );
};
