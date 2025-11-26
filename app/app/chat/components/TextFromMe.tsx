'use client';

import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import { useRef } from 'react';
import { Box } from '@/components/Util/Box';

interface Props {
  text: string;
  animation?: boolean;
  images?: string[];
}
export const TextFromMe = ({ text, animation = false, images = [] }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!animation || !text) {
        return;
      }
      gsap.fromTo(
        '.z-text',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.1,
          ease: 'bounce.out',
          repeat: 6,
          delay: 0,
        },
      );

      let split = SplitText.create('.z-text', {
        type: 'words',
      });

      gsap.from(split.words, {
        filter: 'blur(5px)',
        opacity: 0,
        stagger: {
          amount: 0.5,
          from: 'random',
        },
        repeat: 1,
        yoyo: false,
        onComplete: () => {
          split.revert();
        },
      });
    },
    {
      scope: containerRef,
      dependencies: [text],
    },
  );
  return (
    <div ref={containerRef} className='flex w-full justify-end'>
      <Box
        className={clsx(
          'z-text',
          'inline min-h-10 justify-end border-0! bg-[#bbff00ba] px-5 py-2.5 [word-break:break-word] dark:bg-[#616161]',
        )}
      >
        {images.length > 0 && (
          <div className='my-[5px] flex flex-wrap justify-end gap-2'>
            {images.map((src, idx) => (
              <img
                key={`${src}-${idx}`}
                src={src}
                alt={`user-attachment-${idx + 1}`}
                className='h-20 w-20 rounded-xl object-cover'
              />
            ))}
          </div>
        )}
        {text && <p>{text}</p>}
      </Box>
    </div>
  );
};
