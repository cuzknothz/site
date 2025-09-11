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

  function goDetail(id) {
    //
  }
  return (
    <div ref={articleRef}>
      <Link href={`${'/articles/' + 1}`}>
        <div className='min-h-[70px] w-full cursor-pointer rounded-[16px] border-[1px] border-[#00000028] p-[15px] dark:border-[#65656563]'>
          <Textz text={title} bold className='selection:!bg-[#3bafd9]' />
          <Textz
            text={contentPreview}
            className='line-clamp-2 dark:selection:bg-[#3bafd9]'
            delay={200}
          />
        </div>
      </Link>
    </div>
  );
};
