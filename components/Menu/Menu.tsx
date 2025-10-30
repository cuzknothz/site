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
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { MenuItem } from './Item';
import { ShowMenu } from './ShowMenu';

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

  useEffectNext(() => {
    gsap.to(clusterBtn.current!.childNodes, {
      translateY: showFullMenu ? -40 : 80,
      stagger: {
        each: 0.05,
        from: 'start',
      },
    });
  }, [showFullMenu]);

  return (
    <>
      <div
        className='fixed right-1/2 bottom-0 z-10 flex w-full translate-x-1/2 justify-center gap-3 sm:w-[500px] sm:gap-2 [&__svg]:scale-[1.2]'
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
