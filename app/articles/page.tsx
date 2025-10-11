'use client';

import { Article } from '@/components/article/Article';
import { Textz } from '@/components/Util/Tezt';
import { useArticleListStore } from '@/store/article-list';
import { sleep } from '@/utils/app';
import { useEffect, useState } from 'react';
import FilterIcon from '@/assets/svg/filter.svg';
import { Box } from '@/components/ui/Box';

const article = {
  ['2025']: [
    {
      title: 'Migrating a React Project',
      contentPreview: 'Open Source Projects and Coderplace',
    },
  ],
  twoK24: [],
};

export default function ArticlePage() {
  const modify = useArticleListStore((state) => state.modify);
  const [articles, setArticles] = useState<(typeof article)['2025']>([]);

  const pushArticle = async () => {
    const lengthAricles = article['2025'].length;

    for (let i = 0; i < lengthAricles; i++) {
      await sleep(200);
      setArticles((prevState) => [...prevState, article['2025'][i]]);
    }
  };

  useEffect(() => {
    pushArticle();
  }, []);

  return (
    <div>
      <div className='flex w-full justify-between'>
        <Textz text={'2025'} bold className='selection:!bg-[#710bf7]' />
        {/* <div className='relative '>
          <button>
            <FilterIcon />
          </button>
          <Box className='absolute right-0 bg-[#fff] z-[10] overflow-hidden'>
            <div className='h-[35px] flex items-center px-[20px] hover:bg-[#00c0fa]'>2025</div>
            <div className='h-[35px] flex items-center px-[20px] hover:bg-[#00c0fa]'>2024</div>
            <div className='h-[35px] flex items-center px-[20px] hover:bg-[#00c0fa]'>2023</div>
          </Box>
        </div> */}
      </div>
      <div className='mt-[10px] flex flex-col gap-[10px]'>
        {articles.map((i, idx) => (
          <Article key={idx} {...i} modify={modify} idx={idx} />
        ))}
      </div>
    </div>
  );
}
