'use client';
import { Scrollbar } from '@/components/ScrollBar';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const MainDivision = ({ children }: Props) => {
  return (
    <div className='fixed top-0 left-0 h-full w-full bg-[black] px-[10px] lg:relative lg:mt-[65px] lg:block lg:rounded-[20px] lg:bg-[#121212] lg:px-[50px] lg:pt-[30px] lg:pb-[0px]'>
      <Scrollbar className='h-full w-full py-[65px] lg:pt-0' autoHide={true}>
        {children}
      </Scrollbar>
    </div>
  );
};
