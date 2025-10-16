'use client';

import { Article } from '@/components/article/Article';
import { Textz } from '@/components/Util/Tezt';
import { useArticleListStore } from '@/store/article-list';
import { sleep } from '@/utils/app';
import { List } from 'lodash';
import { useEffect, useState } from 'react';

interface Props {
  data: {
    id: string | number;
    title: string;
    content: string;
  }[];
}

const article = {
  ['2025']: [
    {
      title: 'Migrating a React Project',
      contentPreview: 'Open Source Projects and Coderplace',
    },
  ],
  twoK24: [],
};

export const NotesPage = ({ data }: Props) => {
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
      </div>
      <div className='mt-[10px] flex flex-col gap-[10px]'>
        {data.map((i, idx) => (
          <Article key={idx} {...i} modify={modify} idx={idx} />
        ))}
      </div>
    </div>
  );
};
