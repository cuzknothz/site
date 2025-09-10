'use client';

import clsx from 'clsx';
import { Flip } from 'gsap/Flip';
import { gsap } from 'gsap';
import {
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useGSAP } from '@gsap/react';
import Toilet from '@/assets/svg/toilet.svg';
import Craft from '@/assets/svg/craft.svg';
import Work from '@/assets/svg/work.svg';
import Article from '@/assets/svg/article.svg';
import { useRouter, usePathname } from 'next/navigation';

enum SECTION {
  HOME = 'Home',
  CRAFT = 'Craft',
  WORK = 'Work',
  ARTICLE = 'Article',
}

export const Miracle = () => {
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

  return (
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
        isSelected={getIsSelect(SECTION.CRAFT)}
        label={SECTION.CRAFT}
        onClick={changeTo(SECTION.CRAFT, '/crafts')}
        firstMounted={firstMounted}
      >
        <Craft />
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
    </div>
  );
};

interface MiracleButtonProps {
  isSelected: boolean;
  children: ReactNode;
  label: string;
  onClick: MouseEventHandler;
  firstMounted: boolean;
}
export const MiracleButton = ({
  isSelected = false,
  children = <></>,
  label = '',
  onClick,
  firstMounted,
}: MiracleButtonProps) => {
  const labelRef = useRef<HTMLDivElement>(null);
  const labelText = useRef<HTMLDivElement>(null);

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
        'flex h-[50px] min-w-[50px] cursor-pointer items-center justify-center overflow-hidden rounded-[16px] border-[1px] p-[12px] backdrop-blur-[5px]',
        isSelected
          ? 'border-transparent bg-[#00000032] dark:bg-[#47474757]'
          : 'border-[#00000028] bg-[#00000008] dark:border-[#65656563]',
      )}
    >
      {children}
      <div className='' ref={labelRef}>
        <p
          ref={labelText}
          className='ml-[8px] flex justify-center overflow-hidden text-[13px] select-none'
        >
          {label}
        </p>
      </div>
    </div>
  );
};
