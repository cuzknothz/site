'use client';
import { Scrollbar } from '@/components/ScrollBar';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const MainDivision = ({ children }: Props) => {
  return (
    <div className='h-full w-full rounded-[20px] bg-[#121212] pt-[4px]'>
      <Scrollbar className='h-full w-full'>{children}</Scrollbar>
    </div>
  );
};
