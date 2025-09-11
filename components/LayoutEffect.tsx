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

    // gsap.to(document.getElementsByTagName("title"), {
    //   scrambleText: {
    //     text: "illuzion",
    //     chars: "!@#$%^&*()_+",
    //     revealDelay: 0.5,
    //     speed: 0.3,
    //   },
    //   // repeat: -1,
    // });
  }, [checkFontReady, setFontReady]);

  return (
    <html lang='en' className='dark:bg-[#000] dark:text-[#fff]'>
      <body className='antialiased'>
        <div className='mx-auto mt-[100px] mb-[100px] w-full px-[30px] selection:bg-[black] selection:text-[white] sm:w-[600px] [&>*]:text-[13px]'>
          {fontReady && children}
        </div>
      </body>
    </html>
  );
}
