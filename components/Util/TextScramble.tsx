'use client';

import { sleep } from '@/utils/app';
import { useGSAP } from '@gsap/react';
import { clsx } from 'clsx';
import gsap from 'gsap';
import { Fragment, useRef } from 'react';

interface Props {
  text: string;
  className?: string;
  bold?: boolean;
  delay?: number;
  chars?: string;
  loop?: boolean;
}

export const TextScramble = ({
  text,
  className = '',
  bold = false,
  delay = 0,
  chars = '!@#$%^&*()_+',
  loop = false,
}: Props) => {
  const textRef = useRef<HTMLDivElement>(null);
  useGSAP(
    async () => {
      await sleep(delay);
      gsap.to(textRef.current, {
        duration: 1,
        scrambleText: {
          text,
          chars,
          // chars: "  _ _ _",
          revealDelay: 0.5,
          speed: 0.3,
          delimiter: '',
          rightToLeft: false,
        },
        repeat: loop ? -1 : 0,
        repeatDelay: loop ? 1 : 0,
      });
    },
    { dependencies: [text] },
  );
  return (
    <Fragment>
      <div className={clsx(className, { 'font-bold': bold })} ref={textRef} />
    </Fragment>
  );
};
