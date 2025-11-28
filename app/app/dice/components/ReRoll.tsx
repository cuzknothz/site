import { Box } from '@/components/Util/Box';
import DiceIcon from '../dice.svg';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
 
interface Props {
  onClick: () => void;
  className?: string;
}
 
export const ReRoll = ({ onClick, className }: Props) => {
  const elRef = useRef<HTMLDivElement>(null);
 
  const { contextSafe } = useGSAP(() => {}, { scope: elRef });
 
  const animationBtn = contextSafe(() => {
    let tl = gsap.timeline({});
    tl.fromTo(
      elRef.current,
      { scale: 0.5 },
      { scale: 1, duration: 0.3, ease: 'power2.out', background: '#bdfd82' },
    );
    tl.set(elRef.current, { background: '#fff' });
    tl.fromTo(
      'svg',
      {
        rotate: 0,
      },
      {
        rotate: 360 + 90,
      },
    );
  });
 
  useEffect(() => {
    document.addEventListener('keydown', function (event) {
      if (event.code === 'Space' || event.key === ' ') {
        elRef.current?.click();
      }
    });
  }, []);
 
  const handleClick = () => {
    animationBtn();
    onClick();
  };
 
  return (
    <div
      className={clsx(
        className,
        'origin-center translate-x-1/2 rounded-[20px]',
      )}
      ref={elRef}
      onClick={handleClick}
    >
      <Box
        className={clsx(
          'flex h-[50px] cursor-pointer items-center justify-center gap-[10px] px-[20px] duration-100 hover:bg-[#bdfd82] bg-white active:bg-[#84ff11]',
        )}
      >
        <DiceIcon className='h-[24px] w-[24px] origin-center' />
        <div className=''>Re Roll</div>
      </Box>
    </div>
  );
};