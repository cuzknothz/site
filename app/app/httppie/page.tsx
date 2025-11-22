'use client';

import { ParamsDivision } from '@/components/App/HTTP/Block/Params';
import { PreviewDivision } from '@/components/App/HTTP/Block/Preview';
import { SideBar } from '@/components/App/HTTP/Block/SideBar';
import { TabBar } from '@/components/App/HTTP/Block/TabBar';
import { TopBar } from '@/components/App/HTTP/Block/TopBar';
import { useGlobalStore } from '@/store/global-store';
import clsx from 'clsx';

export default function HTTPPiePage() {
  const showFullMenu = useGlobalStore((s) => s.showFullMenu);

  return (
    <div className='fixed top-0 left-0 flex h-dvh w-screen bg-[#edede8]'>
      <SideBar />
      <div className='flex-1 pr-[15px]'>
        <TabBar />
        <TopBar />
        <div
          className={clsx(
            'mt-2.5 flex flex-1 gap-2.5 duration-700',
            showFullMenu ? 'h-[calc(100dvh-220px)]' : 'h-[calc(100dvh-150px)]',
          )}
        >
          <ParamsDivision />
          <PreviewDivision />
        </div>
      </div>

      {/* dump for color tailwind */}
      <div className='hidden text-[#869e00] text-[#c7382e] text-[#d97727]' />
    </div>
  );
}
