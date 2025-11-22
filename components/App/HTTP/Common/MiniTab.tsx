import { useHTTPieStore } from '@/store/app/httpiez';
import { BoxBlock } from './BoxBlock';
import clsx from 'clsx';
import { useGSAP } from '@gsap/react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Props {
  id: string | number;
  method: string;
  name: string;
}
export const MiniTab = ({ id, method, name }: Props) => {
  const setSelectedRequestId = useHTTPieStore((_) => _.setSelectedRequestId);
  const selectedRequestId = useHTTPieStore((_) => _.selectedRequestId);
  const deleteRequest = useHTTPieStore((_) => _.deleteRequest);
  //

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('containerRef', containerRef.current);
  }, []);

  useGSAP(
    () => {
      let tl = gsap.timeline({});

      tl.set(containerRef.current?.children!, {
        opacity: 0,
      });
      tl.fromTo(
        containerRef.current,
        {
          width: 0,
          opacity: 0,
        },
        {
          width: 'auto',
          opacity: 1,
          duration: 0.2,
          // ease: 'bounce.out',
        },
      );
      tl.to(containerRef.current?.children!, {
        opacity: 1,
        duration: 0.3,
      });
    },
    { scope: containerRef },
  );

  return (
    <BoxBlock
      ref={containerRef}
      onClick={() => setSelectedRequestId(id)}
      key={id}
      className={clsx(
        'z-mini-tab',
        'group overflow-hidden pr-[5px] hover:bg-[#fafaf593]',
        selectedRequestId === id && 'bg-[#fafaf5]',
      )}
    >
      <div className='overflow-hidden text-[#869e00]'>{method}</div>
      <div>{name}</div>
      <div className='h-5 w-5'>
        <button
          onClick={() => deleteRequest(id)}
          className='hidden h-full w-full items-center justify-center rounded-sm group-hover:flex hover:bg-[#9b9b9b]'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path d='M18 6 6 18' />
            <path d='m6 6 12 12' />
          </svg>
        </button>
      </div>
    </BoxBlock>
  );
};
