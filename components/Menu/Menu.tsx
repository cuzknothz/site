'use client';

import Article from '@/assets/svg/article.svg';
import Craft from '@/assets/svg/craft.svg';
import Magic from '@/assets/svg/miracle.svg';
import Toilet from '@/assets/svg/toilet.svg';
import Work from '@/assets/svg/work.svg';
import { useChatStore } from '@/store/chat';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MenuItem } from './Item';
import { ShowMenu } from './ShowMenu';
import { useGlobalStore } from '@/store/global-store';
import { useEffectNext } from '@/hooks/useEffectNext';
// import { useDidMountEffect } from '@/hooks/useDidMountEffect';

enum SECTION {
  HOME = 'Home',
  CRAFT = 'Craft',
  WORK = 'Work',
  ARTICLE = 'Article',
  CHAT = 'AI',
}

export const Menu = () => {
  const [currentSelect, setCurrentSelect] = useState<SECTION | ''>(
    SECTION.HOME,
  );
  const clusterBtn = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  function changeTo(to: SECTION, path: string) {
    return () => {
      setCurrentSelect(to);
      router.push(path);
    };
  }

  function getIsSelect(section: SECTION) {
    return currentSelect === section;
  }

  const syncSelect = useCallback(() => {
    const to = {
      '/': SECTION.HOME,
      '/crafts': SECTION.CRAFT,
      '/works': SECTION.WORK,
      '/articles': SECTION.ARTICLE,
      '/chat': SECTION.CHAT,
    }[pathname];

    setCurrentSelect(to || '');
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

    setTimeout(() => {
      setShowFullMenu(false);
    }, 1000);
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
        className='fixed right-1/2 bottom-0 flex w-full translate-x-1/2 justify-center gap-[12px] sm:w-[500px] sm:gap-[8px] [&__svg]:scale-[1.2]'
        ref={clusterBtn}
      >
        <MenuItem
          isSelected={getIsSelect(SECTION.HOME)}
          label={SECTION.HOME}
          onClick={changeTo(SECTION.HOME, '/')}
        >
          <Toilet />
        </MenuItem>

        <MenuItem
          isSelected={getIsSelect(SECTION.WORK)}
          label={SECTION.WORK}
          onClick={changeTo(SECTION.WORK, '/works')}
        >
          <Work />
        </MenuItem>
        <MenuItem
          isSelected={getIsSelect(SECTION.ARTICLE)}
          label={SECTION.ARTICLE}
          onClick={changeTo(SECTION.ARTICLE, '/articles')}
        >
          <Article />
        </MenuItem>
        <MenuItem
          isSelected={getIsSelect(SECTION.CRAFT)}
          label={SECTION.CRAFT}
          onClick={changeTo(SECTION.CRAFT, '/crafts')}
        >
          <Craft />
        </MenuItem>
        <MenuItem
          isSelected={getIsSelect(SECTION.CHAT)}
          label={SECTION.CHAT}
          onClick={clickChat}
        >
          <Magic />
        </MenuItem>
      </div>
      <ShowMenu />
    </>
  );
};
