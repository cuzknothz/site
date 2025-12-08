'use client';

import { Article } from '@/components/Note/NoteList';
import { TextScramble } from '@/components/Util/TextScramble';
import { Work } from './Work';
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
      <TextScramble text={'2k25'} bold className='selection:bg-[#710bf7]!' />
      <div className='mt-2.5 flex flex-col gap-2.5'>
        <>
          {data.map((i, idx) => (
            <Work key={idx} {...i} />
          ))}
        </>
      </div>
    </div>
  );
}
