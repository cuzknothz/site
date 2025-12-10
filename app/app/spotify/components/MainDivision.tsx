'use client';
import { Scrollbar } from '@/components/ScrollBar';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const MainDivision = ({ children }: Props) => {
  return (
    <div className='h-full w-full bg-[black] px-[10px] lg:rounded-[20px] lg:bg-[#121212] lg:px-[100px]'>
      <Scrollbar className='h-full w-full'>{children}</Scrollbar>
    </div>
  );
};
