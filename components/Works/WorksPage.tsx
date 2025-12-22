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

// const article = {
//   ['2025']: [
//     {
//       title: 'Threads',
//       contentPreview: 'In the universe 🪐',
//       link: 'https://threads-00.vercel.app/',
//     },
//   ],
//   twoK24: [],
// };

const article = {
  // ['2k21']: [],
  ['2k22']: [
    {
      title: 'SC',
      content: 'Soundcloud',
      link: 'https://soundcloud.cuzknothz.site/',
      image: '/soundcloud.png',
    },
    {
      title: 'Instagram Clone',
      content: 'With Nuxt3',
      link: 'https://github.com/cuzknothz/instagram-nuxt3/',
      image: '/instagram.png',
    },
  ],
  ['2k25']: [
    {
      title: 'Threads',
      content: 'In the universe',
      link: 'https://threads.cuzknothz.site/',
      image: '/threads.png',
    },
  ],
};

export default function WorksPage() {
  // const [articles, setArticles] = useState<(typeof article)['2025']>([]);

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
    <div className='flex flex-col gap-[15px]'>
      {Object.keys(article).map((year) => (
        <div key={year}>
          <TextScramble text={year} bold className='selection:bg-[#710bf7]!' />
          <div className='mt-2.5 flex flex-col gap-2.5'>
            <>
              {article[year as keyof typeof article].map((i, idx) => (
                <Work key={idx} {...i} />
              ))}
            </>
          </div>
        </div>
      ))}
      {/* <div>
        <TextScramble text={'2k21'} bold className='selection:bg-[#710bf7]!' />
        <div className='mt-2.5 flex flex-col gap-2.5'>
          <>
            {data.map((i, idx) => (
              <Work key={idx} {...i} />
            ))}
          </>
        </div>
      </div>
      <div>
        <TextScramble text={'2k25'} bold className='selection:bg-[#710bf7]!' />
        <div className='mt-2.5 flex flex-col gap-2.5'>
          <>
            {data.map((i, idx) => (
              <Work key={idx} {...i} />
            ))}
          </>
        </div>
      </div> */}
    </div>
  );
}
