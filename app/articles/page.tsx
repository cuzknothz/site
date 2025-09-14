'use client';

import { Article } from '@/components/article/Article';
import { Textz } from '@/components/Util/Tezt';
import { useArticleListStore } from '@/store/article-list';
import { sleep } from '@/utils/app';
import { useEffect, useState } from 'react';

const article = {
  ['2025']: [
    {
      title: 'A slightly belated 2024 retrospective',
      contentPreview:
        'Reflections on My First Offline Session Presentation Offline Session Presentation Offline Session PresentationOffline Session Presentation Offline Session Presentation',
    },
    {
      title: 'Migrating a React Project',
      contentPreview: 'Open Source Projects and Coderplace',
    },
    {
      title: 'Migrating a React Project',
      contentPreview: 'Open Source Projects and Coderplace',
    },
  ],
  twoK24: [],
};

export default function ArticlePage() {
  const modify = useArticleListStore((state) => state.modify);
  const [articles, setArticles] = useState<typeof article['2025']>([]);

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
      <Textz text={'2025'} bold className='selection:!bg-[#710bf7]' />
      <div className='mt-[10px] flex flex-col gap-[10px]'>
        {articles.map((i, idx) => (
          <Article key={idx} {...i} modify={modify} idx={idx} />
        ))}
      </div>
    </div>
  );
}
