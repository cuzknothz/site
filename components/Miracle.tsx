'use client';

import Article from '@/assets/svg/article.svg';
import CircleUp from '@/assets/svg/circle-up.svg';
import CloseIcon from '@/assets/svg/close.svg';
import Craft from '@/assets/svg/craft.svg';
import Magic from '@/assets/svg/miracle.svg';
import BrightToFront from '@/assets/svg/bright-to-front.svg';

import Toilet from '@/assets/svg/toilet.svg';
import Work from '@/assets/svg/work.svg';
import { modifyMode, useArticleListStore } from '@/store/article-list';
import { useSquezeStore } from '@/store/squeze';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { usePathname, useRouter } from 'next/navigation';
import {
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useClickAway } from 'react-use';
import { Box } from './ui/Box';
import { useChatStore } from '@/store/chat';

enum SECTION {
  HOME = 'Home',
  CRAFT = 'Craft',
  WORK = 'Work',
  ARTICLE = 'Article',
  CHAT = 'AI',
}

export const Miracle = () => {
  const setFullScreen = useChatStore((state) => state.setFullScreen);
  const [currentSelect, setCurrentSelect] = useState<SECTION | ''>(
    SECTION.HOME,
  );
  const clusterBtn = useRef<HTMLDivElement>(null);
  const [firstMounted, setFirstMounted] = useState(true);
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

  function firstMouted() {
    setTimeout(() => {
      setFirstMounted(false);
    }, 1000);
  }

  useEffect(() => {
    syncSelect();
    firstMouted();
  }, [syncSelect]);

  useGSAP(() => {
    const allSvg = document.querySelectorAll('svg');
    gsap.set(allSvg, {
      rotate: '360deg',
    });
    gsap.to(allSvg, {
      rotate: 0,
      stagger: {
        each: 0.15,
        from: 'random',
      },
    });
    gsap.to(clusterBtn.current!.childNodes, {
      transform: 'translateY(-30px)',
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
  }, []);

  const tlHidden = useRef<TimelineLite>(null);

  const [showAppArrow, setShowAppArrow] = useState(false);
  const clickChat = () => {
    changeTo(SECTION.CHAT, '/chat')();

    tlHidden.current = gsap.timeline({});
    tlHidden.current.to(clusterBtn.current!.childNodes, {
      scale: 0,
      rotate: 360,
      translateY: 50,
      stagger: {
        each: 0.15,
        from: 'random',
      },
      onComplete: () => {
        setShowAppArrow(true);
        setFullScreen(true);
      },
    });
  };

  const showAllApp = () => {
    tlHidden.current?.reverse();
    setShowAppArrow(false);
    setFullScreen(false);
  };
  return (
    <>
      <div
        className='fixed right-1/2 bottom-0 flex h-[80px] w-full translate-x-1/2 justify-center gap-[12px] pt-[30px] sm:w-[500px] sm:gap-[8px]'
        ref={clusterBtn}
      >
        <MiracleButton
          isSelected={getIsSelect(SECTION.HOME)}
          label={SECTION.HOME}
          onClick={changeTo(SECTION.HOME, '/')}
          firstMounted={firstMounted}
        >
          <Toilet />
        </MiracleButton>

        <MiracleButton
          isSelected={getIsSelect(SECTION.WORK)}
          label={SECTION.WORK}
          onClick={changeTo(SECTION.WORK, '/works')}
          firstMounted={firstMounted}
        >
          <Work />
        </MiracleButton>
        <MiracleButton
          isSelected={getIsSelect(SECTION.ARTICLE)}
          label={SECTION.ARTICLE}
          onClick={changeTo(SECTION.ARTICLE, '/articles')}
          firstMounted={firstMounted}
        >
          <Article />
        </MiracleButton>
        <MiracleButton
          isSelected={getIsSelect(SECTION.CRAFT)}
          label={SECTION.CRAFT}
          onClick={changeTo(SECTION.CRAFT, '/crafts')}
          firstMounted={firstMounted}
        >
          <Craft />
        </MiracleButton>
        <MiracleButton
          isSelected={getIsSelect(SECTION.CHAT)}
          label={SECTION.CHAT}
          onClick={clickChat}
          firstMounted={firstMounted}
        >
          <Magic />
        </MiracleButton>
      </div>
      {showAppArrow && (
        <div
          className='fixed right-1/2 bottom-[0px] translate-x-1/2'
          onClick={showAllApp}
        >
          <BrightToFront />
        </div>
      )}
    </>
  );
};

interface MiracleButtonProps {
  isSelected: boolean;
  children: ReactNode;
  label: SECTION;
  onClick: MouseEventHandler;
  firstMounted: boolean;
}
export const MiracleButton = ({
  isSelected = false,
  children = <></>,
  label,
  onClick,
  firstMounted,
}: MiracleButtonProps) => {
  const labelRef = useRef<HTMLDivElement>(null);
  const labelText = useRef<HTMLDivElement>(null);

  const setModifyMode = useArticleListStore((state) => state.setModifyMode);

  const [isMore, setIsMore] = useState(false);
  const [isModify, setIsModify] = useState(true);
  const moreRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  useClickAway(moreRef, () => {
    if (!isMore) return;

    animateCircle();
    setIsMore(false);
  });
  function clickMore() {
    setIsMore((prev) => !prev);
  }

  const triggerSqueze = useSquezeStore((state) => state.trigger);

  const animateCircle = () => {
    let tl = gsap.timeline({});

    tl.set(circleRef.current, {
      translateY: -30,
      rotate: 180,
    })
      .to(circleRef.current, {
        translateY: 0,
      })
      .to(circleRef.current, {
        rotate: 0,
      });
  };

  function clickModify() {
    animateCircle();
    setIsMore(false);
    const isSuperior = true;
    if (!isSuperior) {
      triggerSqueze({
        title: '',
        content: '',
      });
    }
    setModifyMode(modifyMode.modify);
    setIsModify(true);
  }

  function clickCreate() {
    animateCircle();
    setIsMore(false);
    triggerSqueze({
      title: '',
      content: '',
    });
  }

  useEffect(() => {
    const handlerAnimation = () => {
      const labelState = Flip.getState(labelRef.current);
      labelRef.current!.style.width = isSelected ? 'auto' : '0px';
      gsap.to(labelText.current, {
        duration: 1,
        scrambleText: {
          text: label,
          chars: ' ',
          revealDelay: 0,
          speed: 0.3,
        },
      });
      Flip.from(labelState, { duration: 0.6 });
    };

    handlerAnimation();
  }, [isSelected, label, firstMounted]);
  return (
    <div
      onClick={onClick}
      className={clsx(
        'relative z-[100] flex h-[50px] min-w-[50px] cursor-pointer items-center justify-center rounded-[16px] border-[1px] p-[12px] backdrop-blur-[5px]',
        isSelected
          ? 'border-transparent bg-[#00000032] dark:bg-[#6e6e6e]'
          : 'border-[#00000028] bg-[#00000008] dark:border-[#65656563]',
      )}
    >
      {children}
      <div ref={labelRef}>
        <p
          ref={labelText}
          className='ml-[8px] flex justify-center overflow-hidden text-[13px] select-none'
        >
          {label}
        </p>
      </div>
      {isSelected && [SECTION.ARTICLE].includes(label) && (
        <>
          <div ref={moreRef}>
            {isMore && (
              <Box className='absolute right-1/2 bottom-[60px] w-[100px] translate-x-1/2 cursor-pointer overflow-hidden'>
                <div
                  className='flex h-[35px] w-full items-center gap-[10px] px-[10px] hover:bg-[#00b7ff]'
                  onClick={clickCreate}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M5 12h14' />
                    <path d='M12 5v14' />
                  </svg>
                  <span>Create</span>
                </div>
                <div
                  className='flex h-[35px] w-full items-center gap-[10px] px-[10px] hover:bg-[#00b7ff]'
                  onClick={clickModify}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z' />
                    <path d='m15 5 4 4' />
                  </svg>
                  <span>Modify</span>
                </div>
              </Box>
            )}
          </div>

          <button
            className='absolute top-[-25px] right-1/2 translate-x-1/2 cursor-pointer'
            onClick={clickMore}
          >
            <div ref={circleRef}>{!isMore && <CircleUp />}</div>
          </button>
        </>
      )}
    </div>
  );
};
