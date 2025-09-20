'use client';

import { useSquezeStore } from '@/store/squeze';
import { Box } from '../ui/Box';
import { BackDrop } from './BackDrop';
import { Textz } from './Tezt';
import CloseIcon from '@/assets/svg/close.svg';
import { useRef } from 'react';
import { useClickAway } from 'react-use';

interface Props {
  title: string;
  content: string;
  hideTitle?: boolean;
  onYes?: Function;
}

export const defaultParamsSqueze = {
  title: '🐤 Wait a minutes',
  content: 'Who are you 🤡 :))',
};
export const Squeze = ({
  content = defaultParamsSqueze.content,
  title = defaultParamsSqueze.title,
  hideTitle = false,
  onYes = () => {},
}: Props) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const close = useSquezeStore((state) => state.close);

  useClickAway(boxRef, close);

  const clickYes = () => onYes();

  return (
    <div>
      <BackDrop>
        <div ref={boxRef}>
          <Box className='w-[300px] bg-[#fff] dark:bg-[#000]'>
            {!hideTitle && (
              <div className='flex h-[40px] w-full items-center justify-between border-b-[1px] border-[#00000028] px-[10px] dark:border-[#65656563]'>
                <Textz text={title} bold />
                <button onClick={close} className='cursor-pointer'>
                  <CloseIcon />
                </button>
              </div>
            )}

            <div className='px-[10px] py-[20px]'>
              <Textz text={content} delay={500} />
              <div className='mt-[10px] flex justify-between gap-[10px]'>
                <Box
                  className='flex h-[40px] w-[100px] items-center justify-center'
                  onClick={clickYes}
                >
                  Yes
                </Box>
                <Box
                  className='flex h-[40px] w-[100px] items-center justify-center'
                  onClick={close}
                >
                  Cancel
                </Box>
              </div>
            </div>
          </Box>
        </div>
      </BackDrop>
    </div>
  );
};
