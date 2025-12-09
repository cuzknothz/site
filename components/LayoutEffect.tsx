'use client';

import { useGlobalStore } from '@/store/global';
import { useSquezeStore } from '@/store/squeze';
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
import { Scrollbar } from './ScrollBar';
import { Squeze } from './Util/Confirm';
import { Menu } from './Menu/Menu';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

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

  const setClientWidth = useGlobalStore((s) => s.setClientWidth);
  const clientWidth = useGlobalStore((s) => s.clientWidth);
  const pathname = usePathname();

  const isSpotifyApp = pathname === '/app/spotify';

  useEffect(() => {
    const onResize = () => {
      window.innerWidth && setClientWidth?.(window.innerWidth);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return (
    <body className='antialiased'>
      <Scrollbar className='h-dvh'>
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
      </Scrollbar>
      <div className={clsx(isSpotifyApp && clientWidth! < 1024 && 'hidden')}>
        <Menu />
      </div>
    </body>
  );
}
