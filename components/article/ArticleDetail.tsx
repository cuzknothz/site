'use client';

import { Code } from '../Util/Code';
import { Textz } from '../Util/Tezt';

export const ArticleDetail = () => {
  const code = `
  import { useGSAP } from '@gsap/react';
import { Textz } from '../Util/Tezt';
import { useRef } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
 
interface Props {
  title: string;
  contentPreview: string;
}
 
export const Article = ({ title, contentPreview }: Props) => {
  const articleRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from(articleRef.current, {
      y: '50',
      rotate: 'random([-5, 5])',
    });
  }, []);
 
};`;

  return (
    <div>
      <Textz
        bold
        text={'Articles > ' + 'A slightly belated 2024 retrospective'}
        className='mb-[10px]'
      />
      <Code code={code} />
    </div>
  );
};
