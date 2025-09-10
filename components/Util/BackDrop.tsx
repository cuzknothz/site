import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export const BackDrop = ({ children }: Props) => {
  return (
    <div className='fixed top-0 left-0 z-10 flex h-screen w-screen items-center justify-center bg-[#ffffff14] backdrop-blur-[2px]'>
      {children}
    </div>
  );
};
