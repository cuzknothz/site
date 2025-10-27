'use client';
import { Box } from '@/components/ui/Box';
import Market from '@/assets/svg/market.svg';
import AI from '@/assets/svg/ai.svg';
import FingerPrint from '@/assets/svg/finger-print.svg';
import { BackDrop } from '@/components/Util/BackDrop';
import Link from 'next/link';

export default async function WPage() {
  return (
    <BackDrop>
      <Box className='grid w-auto grid-cols-4 gap-4 rounded-[30px] p-[15px] [&__svg]:h-6! [&__svg]:w-6!'>
        <Link
          href={'/tools/crafts'}
          title='Market'
          className='flex flex-col items-center'
        >
          <Box className='flex h-[55px] w-[55px] items-center justify-center gap-[5px]'>
            <Market />
          </Box>
          <p className='text-[13px]'>Market</p>
        </Link>
        <Link
          href={'/tools/chat'}
          title='Chat AI'
          className='flex flex-col items-center'
        >
          <Box className='flex h-[55px] w-[55px] items-center justify-center'>
            <AI />
          </Box>
          <p className='text-[13px]'>Chat AI</p>
        </Link>
        <Link
          href={'/tools/client-info'}
          title='FP'
          className='flex flex-col items-center'
        >
          <Box className='flex h-[55px] w-[55px] items-center justify-center'>
            <FingerPrint />
          </Box>
          <p className='text-[13px]'>FP</p>
        </Link>
      </Box>
    </BackDrop>
  );
}
