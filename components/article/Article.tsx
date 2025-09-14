import { modifyMode, useArticleListStore } from '@/store/article-list';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Textz } from '../Util/Tezt';
import CloseIcon from '@/assets/svg/close.svg';
import { useSquezeStore } from '@/store/squeze';
import { Box } from '../ui/Box';
import clsx from 'clsx';

interface Props {
  title: string;
  contentPreview: string;
  modify: modifyMode;
  idx: number;
}

export const Article = ({ title, contentPreview, modify, idx }: Props) => {
  const articleRef = useRef<HTMLDivElement>(null);
  const setModifyMode = useArticleListStore((state) => state.setModifyMode);
  const modifyContainerRef = useRef<HTMLDivElement>(null);

  const trigger = useSquezeStore((state) => state.trigger);

  useGSAP(() => {
    gsap.from(articleRef.current, {
      y: '200',
      rotate: idx % 2 == 0 ? -10 : 10,
    });
  }, []);

  useEffect(() => {
    setModifyMode(modifyMode.null);
  }, [setModifyMode]);

  useEffect(() => {
    gsap.to(modifyContainerRef.current!, {
      opacity: modify === modifyMode.modify ? 1 : 0,
    });
  }, [modify]);

  function clickEdit() {
    trigger({
      title: '',
      content: '',
    });
  }

  function clickDelete() {
    trigger({
      title: '',
      content: '',
    });
  }

  return (
    <div ref={articleRef} className='relative'>
      <div
        className={clsx(
          'flex min-h-[70px] w-full flex-col gap-[5px] rounded-[16px] border-[1px] border-[#00000028] p-[15px] dark:border-[#65656563]',
          modify === modifyMode.modify ? '!pb-[10px]' : 'pb-[15px]',
        )}
      >
        <Link href={`${'/articles/' + 1}`}>
          <Textz text={title} bold className='inline selection:!bg-[#3bafd9]' />
        </Link>
        <Textz
          text={contentPreview}
          className='line-clamp-3 dark:selection:bg-[#3bafd9]'
          delay={200}
        />
        {modify === modifyMode.modify && (
          <div className='flex w-full gap-[15px]'>
            <Box className='!rounded-[10px] overflow-hidden'>
              <button
                title='Edit'
                onClick={clickEdit}
                className='bg-[#b5e832] px-[10px] py-[5px]'
              >
                Edit
              </button>
            </Box>
            <Box className='!rounded-[10px] overflow-hidden'>
              <button
                title='Delete'
                onClick={clickDelete}
                className='bg-[#32c3e8] px-[10px] py-[5px]'
              >
                Delete
              </button>
            </Box>
          </div>
        )}
      </div>
    </div>
  );
};
