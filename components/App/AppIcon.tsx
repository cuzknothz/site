import Link from 'next/link';
import { Box } from '../ui/Box';
import { ReactNode } from 'react';

interface Props {
  href: string;
  name: string;
  children: ReactNode;
  text?: string;
}

export const AppIcon = ({
  href = '/',
  name = '',
  children,
  text = '',
}: Props) => {
  return (
    <Link
      href={href}
      title='Spotify'
      className='relative flex flex-col items-center'
    >
      <Box className='relative flex h-[55px] w-[55px] items-center justify-center overflow-hidden duration-500 hover:bg-[#9d9d9d62] active:bg-[#3c3c3c]'>
        <>
          {children}
          {text && (
            <div className='absolute -right-[2px] bottom-[50%] h-[20px] w-[80px] origin-center translate-x-[30px] rotate-45 bg-[#03cff3] text-center'>
              {text}
            </div>
          )}
        </>
      </Box>
      <p className='text-[13px] select-none'>{name}</p>
    </Link>
  );
};
