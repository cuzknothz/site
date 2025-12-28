import Link from 'next/link';
import { Box } from './Util/Box';
import { ReactNode } from 'react';

interface Props {
  href: string;
  name: string;
  children: ReactNode;
  text?: string;
  underDevelopment?: boolean;
}

export const AppIcon = ({
  href = '/',
  name = '',
  children,
  text = '',
  underDevelopment = false,
}: Props) => {
  return (
    <Link
      href={href}
      title={name + (underDevelopment ? ' (Under Development)' : '')}
      className='relative flex flex-col items-center'
    >
      <Box className='relative flex h-[55px] w-[55px] items-center justify-center overflow-hidden bg-[#00000008] duration-500 hover:bg-[#9d9d9d62] active:bg-[#3c3c3c]'>
        <>
          {children}
          {text && (
            <div className='absolute -right-0.5 bottom-[50%] h-5 w-20 origin-center translate-x-[30px] rotate-45 bg-[#03cff3] text-center'>
              {text}
            </div>
          )}
        </>
      </Box>
      <p className='text-[13px] select-none'>{name}</p>
    </Link>
  );
};
