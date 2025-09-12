import { modifyMode, useArticleListStore } from '@/store/article-list';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Textz } from '../Util/Tezt';
import CloseIcon from '@/assets/svg/close.svg';
import { useSquezeStore } from '@/store/squeze';

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
      y: '50',
      rotate: 'random([-5, 5])',
    });
  }, []);

  useEffect(() => {
    setModifyMode(modifyMode.null);
  }, [setModifyMode]);

  useEffect(() => {
    gsap.from(articleRef.current, {
      rotate: idx % 2 == 0 ? -5 : 5,
    });
    gsap.to(articleRef.current, {
      rotate: '0',
    });
  }, [idx, modify]);

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
      <div className='min-h-[70px] w-full rounded-[16px] border-[1px] border-[#00000028] p-[15px] dark:border-[#65656563]'>
        <Link href={`${'/articles/' + 1}`}>
          <Textz text={title} bold className='inline selection:!bg-[#3bafd9]' />
        </Link>
        <Textz
          text={contentPreview}
          className='line-clamp-3 dark:selection:bg-[#3bafd9]'
          delay={200}
        />
      </div>

      <div
        ref={modifyContainerRef}
        className='absolute top-[10px] right-[10px] flex gap-[15px]'
      >
        <button title='Edit' onClick={clickEdit}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2' />
            <path d='M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z' />
            <path d='M8 18h1' />
          </svg>
        </button>
        <button title='Delete' onClick={clickDelete}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
