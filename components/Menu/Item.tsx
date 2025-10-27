'use client';

import CircleUp from '@/assets/svg/circle-up.svg';

import { Box } from '@/components/ui/Box';
import { modifyMode, useArticleListStore } from '@/store/article-list';
import { SECTION } from '@/store/global-store';
import { useSquezeStore } from '@/store/squeze';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { MouseEventHandler, ReactNode, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

interface MiracleButtonProps {
  isSelected: boolean;
  children: ReactNode;
  label: SECTION;
  onClick: MouseEventHandler;
}
export const MenuItem = ({
  isSelected = false,
  children = <></>,
  label,
  onClick,
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

  useGSAP(() => {
    const labelState = Flip.getState(labelRef.current);
    labelRef.current!.style.width = isSelected ? 'auto' : '0px';
    gsap.to(labelText.current, {
      duration: 1,
      scrambleText: {
        text: label,
        chars: ' ',
        revealDelay: 0,
        speed: 1,
      },
    });
    Flip.from(labelState, { duration: 0.6 });
  }, [isSelected, label]);

  return (
    <Box
      onClick={onClick}
      className={clsx(
        'relative z-100 flex h-[55px] min-w-[55px] cursor-pointer items-center justify-center p-3 backdrop-blur-[5px]',
        isSelected
          ? 'border-transparent bg-[#00000032] dark:bg-[#6e6e6e]'
          : 'bg-[#00000008] dark:border-[#65656563]',
      )}
    >
      {' '}
      <div className=''>{children}</div>
      <div ref={labelRef}>
        <p
          ref={labelText}
          className='ml-2 flex justify-center overflow-hidden text-[13px] select-none'
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
                  className='flex h-[35px] w-full items-center gap-2.5 px-2.5 hover:bg-[#00b7ff]'
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
                  className='flex h-[35px] w-full items-center gap-2.5 px-2.5 hover:bg-[#00b7ff]'
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
            className='absolute top-[-25px] right-1/2 hidden translate-x-1/2 cursor-pointer'
            onClick={clickMore}
          >
            <div ref={circleRef}>{!isMore && <CircleUp />}</div>
          </button>
        </>
      )}
    </Box>
  );
};
