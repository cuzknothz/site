'use client';

import { useGlobalStore } from '@/store/global-store';
import devfools from 'devfools';
import gsap from 'gsap';
import {
  Flip,
  ScrambleTextPlugin,
  ScrollSmoother,
  ScrollTrigger,
  SplitText,
} from 'gsap/all';
import { ReactNode, useCallback, useEffect } from 'react';
import { Squeze } from './Util/🐤';
import { useSquezeStore } from '@/store/squeze';

interface Props {
  children: ReactNode;
}
export default function LayoutEffect({ children }: Props) {
  gsap.registerPlugin(
    Flip,
    ScrambleTextPlugin,
    ScrollTrigger,
    ScrollSmoother,
    SplitText,
  );

  const setFontReady = useGlobalStore((state) => state.setFontReady);
  const fontReady = useGlobalStore((state) => state.fontReady);

  const checkFontReady = useCallback(() => {
    document.fonts.ready.then(() => {
      setFontReady(true);
    });
  }, [setFontReady]);

  useEffect(() => {
    checkFontReady();
    devfools('all');
  }, [checkFontReady, setFontReady]);

  const showSqueze = useSquezeStore((state) => state.show);
  const titleSqueze = useSquezeStore((state) => state.title);
  const contentSqueze = useSquezeStore((state) => state.content);
  const toogleShow = useSquezeStore((state) => state.toogleShow);

  return (
    <html lang='en' className='duration-0 dark:bg-[#000] dark:text-[#fff]'>
      <body className='antialiased'>
        <div className='mx-auto mt-[100px] mb-[100px] w-full px-[30px] selection:bg-[black] selection:text-[white] sm:w-[500px] [&__button]:cursor-pointer [&>*]:text-[13px]'>
          {fontReady && children}

          {showSqueze && <Squeze title={titleSqueze} content={contentSqueze} />}
        </div>
      </body>
    </html>
  );
}
