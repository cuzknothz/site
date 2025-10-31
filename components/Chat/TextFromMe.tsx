'use client';

import { useGSAP } from '@gsap/react';
import { Box } from '../ui/Box';
import { useRef } from 'react';
import gsap from 'gsap';
import clsx from 'clsx';
import { Textz } from '../Util/Tezt';
import { SplitText } from 'gsap/all';
import { random } from 'lodash';

interface Props {
  text: string;
}
export const TextFromMe = ({ text }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.z-text',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.1,
          ease: 'bounce.out',
          repeat: 5,
          delay: 0,
        },
      );

      let split = SplitText.create('.z-text', {
        type: 'chars, words',
      });

      gsap.from(split.words, {
        // y: 'random([100vh])',
        // rotate: 'random(90, 180)',
        // translateX: 'random(-200,200)',
        // scale: 0.1,
        repeat: 1,
        yoyo: false,
        // filter: 'blur(1px)',
        filter: 'blur(5px)',
        opacity: 0,
        stagger: {
          amount: 0.5,
          from: 'random',
        },
        onComplete: () => {
          split.revert();
        },
      });
    },
    {
      scope: containerRef,
    },
  );
  return (
    <div ref={containerRef} className='flex w-full justify-end'>
      <Box
        className={clsx(
          'z-text',
          'inline min-h-10 justify-end border-0! bg-[#bbff0073] px-5 py-2.5 [word-break:break-word] dark:bg-[#616161]',
        )}
      >
        {/* <Textz text={text} className='leading-[20px]' /> */}
        <p className=''>{text}</p>
      </Box>
    </div>
  );
};
