import { useHTTPieStore } from '@/store/app/httpiez';
import clsx from 'clsx';
import { useRef } from 'react';
import { BoxBlock } from './BoxBlock';

interface Props {
  id: number | string;
  name: string;
  method: string;
}

export const MiniRequest = ({ id, method, name }: Props) => {
  const setSelectedRequestId = useHTTPieStore((_) => _.setSelectedRequestId);
  const selectedRequestId = useHTTPieStore((_) => _.selectedRequestId);

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <BoxBlock
      ref={containerRef}
      onClick={() => setSelectedRequestId(id)}
      key={id}
      className={clsx(
        'group justify-start hover:bg-[#e0e0e0]',
        selectedRequestId === id && 'bg-[#d1d1d1]',
      )}
    >
      <div className='w-[30px] flex-none text-[#869e00]'>{method}</div>
      <div className='flex-1'>{name}</div>
      <div className='hidden gap-[10px] opacity-75 group-hover:flex'>
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='15'
            height='15'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path d='M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z' />
            <path d='m15 5 4 4' />
          </svg>
        </div>
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='15'
            height='15'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6' />
            <path d='M3 6h18' />
            <path d='M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
          </svg>
        </div>
      </div>
    </BoxBlock>
  );
};
