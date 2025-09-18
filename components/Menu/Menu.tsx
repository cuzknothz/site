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
  const [firstMounted, setFirstMounted] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  function changeTo(to: SECTION, path: string) {
    console.log('sadjfslkdjfklsdfjkljsdklafjsldkfjsdflk;jfl;kdsj;klf');
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

  function firstMouted() {
    setTimeout(() => {
      setFirstMounted(false);
    }, 1000);
  }

  useEffect(() => {
    syncSelect();
    firstMouted();
  }, [syncSelect]);

  // useGSAP(() => {
  //   const allSvg = document.querySelectorAll('svg');
  //   gsap.set(allSvg, {
  //     rotate: '360deg',
  //   });
  //   gsap.to(allSvg, {
  //     rotate: 0,
  //     stagger: {
  //       each: 0.15,
  //       from: 'random',
  //     },
  //   });
  //   gsap.to(clusterBtn.current!.childNodes, {
  //     transform: 'translateY(-30px)',
  //     scale: 1,
  //     rotate: 0,
  //     stagger: {
  //       each: 0.15,
  //       from: 'random',
  //     },
  //     onComplete: () => {
  //       // setFirstMounted(false);
  //     },
  //   });
  // }, []);

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
        onComplete: () => {
          // setFirstMounted(false);
        },
      });
    },
    { scope: clusterBtn },
  );

  const animationIntro = () => {};

  const tlHidden = useRef<TimelineLite>(null);
  const setShowFullMenu = useGlobalStore((s) => s.setShowFullMenu);
  const showFullMenu = useGlobalStore((s) => s.showFullMenu);

  useEffect(() => {
    console.log(showFullMenu);
    console.log('sadkljfksldf');
  }, [showFullMenu]);

  const clickChat = () => {
    changeTo(SECTION.CHAT, '/chat')();

    // tlHidden.current = gsap.timeline({});
    // tlHidden.current.to(clusterBtn.current!.childNodes, {
    //   translateY: 70,
    //   stagger: {
    //     each: 0.15,
    //     from: 'random',
    //   },
    //   onComplete: () => {
    //     setShowFullMenu(false);
    //   },
    // });
  };

  // useDidMountEffect(() => {
  //   gsap.to(clusterBtn.current!.childNodes, {
  //     translateY: showFullMenu ? 70 : -30,
  //     stagger: {
  //       each: 0.15,
  //       from: 'random',
  //     },
  //   });
  //   console.log("HJKSFLHSAKJFHKJ");
  // }, [showFullMenu]);

  // useGSAP(() => {
  //   console.log("IUWROPIUTROIUROI");
  //   gsap.to(clusterBtn.current!.childNodes, {
  //     translateY: showFullMenu ? 70 : -30,
  //     stagger: {
  //       each: 0.15,
  //       from: 'random',
  //     },
  //   });
  // }, [showFullMenu]);

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
          firstMounted={firstMounted}
        >
          <Toilet />
        </MenuItem>

        <MenuItem
          isSelected={getIsSelect(SECTION.WORK)}
          label={SECTION.WORK}
          onClick={changeTo(SECTION.WORK, '/works')}
          firstMounted={firstMounted}
        >
          <Work />
        </MenuItem>
        <MenuItem
          isSelected={getIsSelect(SECTION.ARTICLE)}
          label={SECTION.ARTICLE}
          onClick={changeTo(SECTION.ARTICLE, '/articles')}
          firstMounted={firstMounted}
        >
          <Article />
        </MenuItem>
        <MenuItem
          isSelected={getIsSelect(SECTION.CRAFT)}
          label={SECTION.CRAFT}
          onClick={changeTo(SECTION.CRAFT, '/crafts')}
          firstMounted={firstMounted}
        >
          <Craft />
        </MenuItem>
        <MenuItem
          isSelected={getIsSelect(SECTION.CHAT)}
          label={SECTION.CHAT}
          onClick={clickChat}
          firstMounted={firstMounted}
        >
          <Magic />
        </MenuItem>
      </div>
      <ShowMenu />
    </>
  );
};
