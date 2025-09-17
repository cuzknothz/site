'use client';

import { sleep } from '@/utils/app';
import { useGSAP } from '@gsap/react';
import { clsx } from 'clsx';
import gsap from 'gsap';
import { Fragment, useRef } from 'react';

interface Props {
  text: string | number;
  className?: string;
  bold?: boolean;
  delay?: number;
}

export const Textz = ({
  text,
  className = '',
  bold = false,
  delay = 0,
}: Props) => {
  const textRef = useRef<HTMLDivElement>(null);
  useGSAP(async () => {
    await sleep(delay);
    gsap.to(textRef.current, {
      duration: 1,
      scrambleText: {
        text,
        chars: '!@#$%^&*()_+',
        // chars: "  _ _ _",
        revealDelay: 0.5,
        speed: 0.3,
        delimiter: '',
        rightToLeft: false,
      },
    });
  });
  return (
    <Fragment>
      <div className={clsx(className, { 'font-bold': bold })} ref={textRef} />
    </Fragment>
  );
};
