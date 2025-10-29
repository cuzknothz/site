'use client';

import Article from '@/assets/svg/article.svg';
import Tools from '@/assets/svg/tools.svg';
import Toilet from '@/assets/svg/toilet.svg';
import Work from '@/assets/svg/work.svg';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MenuItem } from './Item';
import { ShowMenu } from './ShowMenu';
import { SECTION, useGlobalStore } from '@/store/global-store';
import { useEffectNext } from '@/hooks/useEffectNext';
import Link from 'next/link';

export const Menu = () => {
  const selected = useGlobalStore((s) => s.select);
  const setSelect = useGlobalStore((s) => s.setSelect);

  const clusterBtn = useRef<HTMLDivElement>(null);
  const router = useRouter();
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
    if (pathname.split('/').includes('app')) {
      setSelect(SECTION.APP);
    }
  }, [pathname]);

  useEffect(() => {
    syncSelect();
  }, [syncSelect]);

  const timeLineIntro = useRef<TimelineLite>(null);

  const { contextSafe } = useGSAP(
    () => {
      gsap.set('svg', {
        rotate: '360deg',
      });

      timeLineIntro.current = gsap.timeline({});
      gsap.to('svg', {
        rotate: 0,
        stagger: {
          each: 0.15,
          from: 'random',
        },
      });
      gsap.to(clusterBtn.current!.childNodes, {
        transform: 'translateY(-40px)',
        scale: 1,
        rotate: 0,
        stagger: {
          each: 0.15,
          from: 'random',
        },
      });
    },
    { scope: clusterBtn },
  );

  const showFullMenu = useGlobalStore((s) => s.showFullMenu);

  useEffect(() => {}, [showFullMenu]);

  useEffectNext(() => {
    console.log('sdafsdf', 'jkDSLKFJDLKJ');
    gsap.to(clusterBtn.current!.childNodes, {
      translateY: showFullMenu ? -40 : 80,
      stagger: {
        each: 0.15,
        from: 'random',
      },
    });
  }, [showFullMenu]);

  return (
    <>
      <div
        className='fixed right-1/2 bottom-0 z-[10] flex w-full translate-x-1/2 justify-center gap-[12px] sm:w-[500px] sm:gap-[8px] [&__svg]:scale-[1.2]'
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
