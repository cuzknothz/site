'use client';

import { Article } from '@/components/article/Article';
import { Textz } from '@/components/Util/Tezt';
import { Work } from '@/components/work/Work';
import { sleep } from '@/utils/app';
import { useEffect, useState } from 'react';

interface Props {
  data: {
    id: string | number;
    title: string;
    content: string;
    link: string;
  }[];
}

const article = {
  ['2025']: [
    {
      title: 'Threads',
      contentPreview: 'In the universe 🪐',
      link: 'https://threads-00.vercel.app/',
    },
  ],
  twoK24: [],
};

export default function WorksPage({ data }: Props) {
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
      <Textz text={'2k25'} bold className='selection:!bg-[#710bf7]' />
      <div className='mt-[10px] flex flex-col gap-[10px]'>
        {data.map((i, idx) => (
          <Work key={idx} {...i} />
        ))}
      </div>
    </div>
  );
}
