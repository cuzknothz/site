'use client';

import { NoteList } from '@/components/Note/NoteList';
import { TextScramble } from '@/components/Util/TextScramble';
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

export const NotesPage = ({ data = [] }: Props) => {
  const modify = useArticleListStore((state) => state.modify);

  const [articles, setArticles] = useState<(typeof article)['2025']>([]);

  // const pushArticle = async () => {
  //   const lengthAricles = article['2025'].length;

  //   for (let i = 0; i < lengthAricles; i++) {
  //     await sleep(200);
  //     setArticles((prevState) => [...prevState, article['2025'][i]]);
  //   }
  // };

  // useEffect(() => {
  //   pushArticle();
  // }, []);

  return (
    <div>
      <div className='flex w-full justify-between'>
        <TextScramble text={'2k25'} bold className='selection:bg-[#710bf7]!' />
      </div>
      <div className='mt-2.5 flex flex-col gap-2.5'>
        {data.map((i, idx) => (
          <NoteList key={idx} {...i} modify={modify} idx={idx} />
        ))}
      </div>
    </div>
  );
};
