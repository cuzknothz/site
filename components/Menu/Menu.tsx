'use client';

import Article from '@/assets/svg/article.svg';
import Toilet from '@/assets/svg/toilet.svg';
import Tools from '@/assets/svg/tools.svg';
import Work from '@/assets/svg/work.svg';
import { useEffectNext } from '@/hooks/useEffectNext';
import { SECTION, useGlobalStore } from '@/store/global-store';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { MenuItem } from './Item';
import { ShowMenu } from './ShowMenu';
import clsx from 'clsx';

export const Menu = () => {
  const selected = useGlobalStore((s) => s.select);
  const setSelect = useGlobalStore((s) => s.setSelect);

  const clusterBtn = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  function changeTo(to: SECTION) {
    return () => {
      setSelect(to);
    };
  }

  function isSelect(section: SECTION) {
    return selected === section;
  }

  const syncSelect = useCallback(() => {
    const to = {
      '/': SECTION.HOME,
      '/works': SECTION.WORK,
      '/notes': SECTION.NOTE,
      '/app': SECTION.APP,
    }[pathname];

    if (to) {
      setSelect(to);
    }
    if (pathname.includes('/app')) {
      setSelect(SECTION.APP);
    }
  }, [pathname]);

  useEffect(() => {
    syncSelect();
  }, [syncSelect]);

  const { contextSafe } = useGSAP(
    () => {
      gsap.set('svg', {
        rotate: '360deg',
      });

      gsap.to('svg', {
        rotate: 0,
        stagger: {
          each: 0.15,
          from: 'random',
        },
      });
      let tl = gsap.timeline({});
      tl.to('a', {
        transform: 'translateY(-40px)',
        scale: 1,
        rotate: 0,
        stagger: {
          each: 0.15,
          from: 'random',
        },
      });
      tl.set('a', { scale: 0 });
      tl.to('a', {
        scale: 1,
        stagger: {
          each: 0.05,
          from: 'start',
        },
        ease: 'bounce.out',
        duration: 0.5,
      });
    },
    { scope: clusterBtn },
  );

  const showFullMenu = useGlobalStore((s) => s.showFullMenu);
  // const showFullMenu = useGlobalStore((s) => s.showFullMenu);

  const animation = contextSafe(() => {
    let tl = gsap.timeline({});
    tl.to(clusterBtn.current!.childNodes, {
      translateY: showFullMenu ? -40 : 80,
      stagger: {
        each: 0.05,
        from: 'start',
      },
    });
    if (!showFullMenu) {
      return;
    }
    tl.set('a', { scale: 0 });
    tl.to('a', {
      scale: 1,
      stagger: {
        each: 0.05,
        from: 'start',
      },
      ease: 'bounce.out',
      duration: 0.5,
    });
  });

  useEffectNext(() => {
    animation();
  }, [showFullMenu]);

  console.log('pathname', pathname);
  const isSpotifyApp = pathname === '/app/spotify';

  return (
    <>
      <div
        className={clsx(
          'fixed right-1/2 bottom-0 z-10 flex w-full translate-x-1/2 justify-center gap-3 sm:w-[500px] [&__svg]:scale-[1.2]',
          isSpotifyApp && 'invert',
        )}
        ref={clusterBtn}
      >
        <Link href={'/'}>
          <MenuItem
            isSelected={isSelect(SECTION.HOME)}
            label={SECTION.HOME}
            onClick={changeTo(SECTION.HOME)}
          >
            <Toilet />
          </MenuItem>
        </Link>

        <Link href={'/works'}>
          <MenuItem
            isSelected={isSelect(SECTION.WORK)}
            label={SECTION.WORK}
            onClick={changeTo(SECTION.WORK)}
          >
            <Work />
          </MenuItem>
        </Link>

        <Link href={'/notes'}>
          <MenuItem
            isSelected={isSelect(SECTION.NOTE)}
            label={SECTION.NOTE}
            onClick={changeTo(SECTION.NOTE)}
          >
            <Article />
          </MenuItem>
        </Link>

        <Link href={'/app'}>
          <MenuItem
            isSelected={isSelect(SECTION.APP)}
            label={SECTION.APP}
            onClick={changeTo(SECTION.APP)}
          >
            <Tools />
          </MenuItem>
        </Link>
      </div>
      <ShowMenu />
    </>
  );
};
