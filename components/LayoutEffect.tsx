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
import { Squeze } from './Util/Confirm';
import { useSquezeStore } from '@/store/squeze';
import SimpleBar from 'simplebar-react';

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
  const onYesSqueze = useSquezeStore((s) => s.onYes);

  return (
    <body className='antialiased'>
      <SimpleBar className='h-dvh'>
        <div className='mx-auto mt-[70px] mb-[100px] w-full px-[30px] *:text-[13px] selection:bg-[black] selection:text-[white] sm:w-[500px] [&__button]:cursor-pointer'>
          {fontReady && children}

          {showSqueze && (
            <Squeze
              title={titleSqueze}
              content={contentSqueze}
              onYes={onYesSqueze}
            />
          )}
        </div>
      </SimpleBar>
    </body>
  );
}
