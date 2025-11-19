'use client';

import { ParamsDivision } from '@/components/App/HTTP/Params';
import { PreviewDivision } from '@/components/App/HTTP/Preview';
import { TopBar } from '@/components/App/HTTP/TopBar';

export default function HTTPPiePage() {
  return (
    <div className='fixed left-1/2 w-[800px] -translate-x-1/2'>
      <TopBar />
      <div className='mt-2.5 flex gap-2.5'>
        <ParamsDivision />
        <PreviewDivision />
      </div>
    </div>
  );
}
