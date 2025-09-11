'use client';

import { Article } from '@/components/article/Article';
import { Textz } from '@/components/Util/Tezt';
import { Work } from '@/components/work/Work';
import { sleep } from '@/utils/app';
import { useEffect, useState } from 'react';

const article = {
  twoK25: [
    {
      title: 'Threads',
      contentPreview: 'In 3d world',
      link: 'https://threads-00.vercel.app/',
    },
  ],
  twoK24: [],
};

export default function ArticlePage() {
  const [articles, setArticles] = useState<typeof article.twoK25>([]);

  const pushArticle = async () => {
    const lengthAricles = article.twoK25.length;

    for (let i = 0; i < lengthAricles; i++) {
      await sleep(200);
      setArticles((prevState) => [...prevState, article.twoK25[i]]);
    }
  };

  useEffect(() => {
    pushArticle();
  }, []);

  return (
    <div>
      <Textz text={'twoK25'} bold className='selection:!bg-[#710bf7]' />
      <div className='mt-[10px] flex flex-col gap-[10px]'>
        {articles.map((i, idx) => (
          <Work key={idx} {...i} />
        ))}
      </div>
    </div>
  );
}
