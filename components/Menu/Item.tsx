'use client';
import { Box } from '@/components/Util/Box';
import { SECTION } from '@/store/global';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { Fragment, MouseEventHandler, ReactNode, useRef } from 'react';

interface Props {
  isSelected?: boolean;
  children?: ReactNode;
  label?: SECTION | string;
  onClick?: MouseEventHandler;
}
export const MenuItem = ({
  isSelected = false,
  children = <Fragment></Fragment>,
  label = '',
  onClick = () => {},
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const labelText = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      const labelState = Flip.getState(labelRef.current);
      labelRef.current!.style.width = isSelected ? 'auto' : '0px';
      Flip.from(labelState, { duration: 0.5, ease: 'bounce.out' });

      gsap.fromTo(
        svgRef.current,
        { rotate: 0, opacity: 0.5 },
        { rotate: isSelected ? 360 : 0, opacity: 1 },
      );
    },
    {
      dependencies: [isSelected, label],
      scope: containerRef,
    },
  );

  function click() {
    const animationSvg = contextSafe(() => {
      gsap.fromTo(
        svgRef.current,
        { rotate: 0, opacity: 0.5 },
        { rotate: isSelected ? 360 : 0, opacity: 1 },
      );
    });
    animationSvg();
    return onClick;
  }

  return (
    <div ref={containerRef}>
      <Box
        onClick={click}
        className={clsx(
          'pointer-events-auto! relative z-100 flex h-[55px] min-w-[55px] cursor-pointer items-center justify-center p-3 backdrop-blur-[5px]',
          isSelected
            ? 'border-transparent bg-[#00000032] dark:bg-[#6e6e6e]'
            : 'bg-[#00000008] dark:border-[#65656563]',
        )}
      >
        <div ref={svgRef}>{children}</div>
        <div ref={labelRef}>
          <p
            ref={labelText}
            className='ml-2 flex justify-center overflow-hidden text-[13px] select-none'
          >
            {label}
          </p>
        </div>
      </Box>
    </div>
  );
};
