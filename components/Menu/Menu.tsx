'use client';

import Article from '@/assets/svg/article.svg';
import Craft from '@/assets/svg/craft.svg';
import Tools from '@/assets/svg/tools.svg';
import Magic from '@/assets/svg/miracle.svg';
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

export const Menu = () => {
  const selected = useGlobalStore((s) => s.select);
  const setSelect = useGlobalStore((s) => s.setSelect);

  const clusterBtn = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  function changeTo(to: SECTION, path: string) {
    return () => {
      setSelect(to);
      router.push(path);
    };
  }

  function isSelect(section: SECTION) {
    return selected === section;
  }

  const syncSelect = useCallback(() => {
    const to = {
      '/': SECTION.HOME,
      '/works': SECTION.WORK,
      '/articles': SECTION.ARTICLE,
      '/tools': SECTION.TOOL,
    }[pathname];

    if (to) {
      setSelect(to);
    }
    if (pathname.split('/').includes('tools')) {
      setSelect(SECTION.TOOL);
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

  const animationIntro = () => {};

  const tlHidden = useRef<TimelineLite>(null);
  const setShowFullMenu = useGlobalStore((s) => s.setShowFullMenu);
  const showFullMenu = useGlobalStore((s) => s.showFullMenu);

  useEffect(() => {}, [showFullMenu]);

  const clickChat = () => {
    changeTo(SECTION.CHAT, '/chat')();

    // setTimeout(() => {
    //   setShowFullMenu(false);
    // }, 1000);
  };

  useEffectNext(() => {
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
        <MenuItem
          isSelected={isSelect(SECTION.HOME)}
          label={SECTION.HOME}
          onClick={changeTo(SECTION.HOME, '/')}
        >
          <Toilet />
        </MenuItem>

        <MenuItem
          isSelected={isSelect(SECTION.WORK)}
          label={SECTION.WORK}
          onClick={changeTo(SECTION.WORK, '/works')}
        >
          <Work />
        </MenuItem>
        <MenuItem
          isSelected={isSelect(SECTION.ARTICLE)}
          label={SECTION.ARTICLE}
          onClick={changeTo(SECTION.ARTICLE, '/articles')}
        >
          <Article />
        </MenuItem>
        <MenuItem
          isSelected={isSelect(SECTION.TOOL)}
          label={SECTION.TOOL}
          onClick={changeTo(SECTION.TOOL, '/tools')}
        >
          <Tools />
        </MenuItem>
        {/* <MenuItem
          isSelected={isSelect(SECTION.CHAT)}
          label={SECTION.CHAT}
          onClick={clickChat}
        >
          <Magic />
        </MenuItem> */}
      </div>
      <ShowMenu />
    </>
  );
};
