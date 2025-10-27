import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export const BackDrop = ({ children }: Props) => {
  return (
    <div className='fixed top-0 left-0 z-10 flex h-dvh w-screen items-center justify-center bg-[#ffffffce] backdrop-blur-[2px] dark:bg-[#2121219a]'>
      {children}
    </div>
  );
};
