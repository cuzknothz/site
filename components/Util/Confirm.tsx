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
          <Box className='w-[300px] bg-white dark:bg-black'>
            {!hideTitle && (
              <div className='flex h-10 w-full items-center justify-between border-b border-[#00000028] px-2.5 dark:border-[#65656563]'>
                <Textz text={title} bold />
                <button onClick={close} className='cursor-pointer'>
                  <CloseIcon />
                </button>
              </div>
            )}

            <div className='px-2.5 py-5'>
              <Textz text={content} delay={500} />
              <div className='mt-2.5 flex justify-between gap-2.5'>
                <Box
                  className='flex h-10 w-[100px] items-center justify-center'
                  onClick={clickYes}
                >
                  Yes
                </Box>
                <Box
                  className='flex h-10 w-[100px] items-center justify-center'
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
