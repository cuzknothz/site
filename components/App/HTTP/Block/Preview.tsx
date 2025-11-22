import { Box } from '@/components/Util/Box';
import { BoxBlock } from '../Common/BoxBlock';
import { useState } from 'react';
import clsx from 'clsx';

enum TAB {
  REQ,
  RES,
  NULL,
}
export const PreviewDivision = () => {
  const [tab, setTab] = useState(TAB.NULL);
  return (
    <>
      <Box className='flex-1 rounded-[15px]! bg-[#fafaf5] p-[5px]'>
        <div className='flex gap-[5px]'>
          <BoxBlock
            onClick={() => setTab(TAB.REQ)}
            className={clsx('', tab === TAB.REQ && 'bg-[#e0e0e0]')}
          >
            <div>Request</div>
            <div className='text-[#869e00]'>GET</div>
          </BoxBlock>
          <BoxBlock
            onClick={() => setTab(TAB.RES)}
            className={clsx('', tab === TAB.RES && 'bg-[#e0e0e0]')}
          >
            <div>Response</div>
            <div className='text-[#869e00]'>200</div>
          </BoxBlock>
        </div>
      </Box>
    </>
  );
};
