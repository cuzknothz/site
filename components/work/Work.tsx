import { useGSAP } from '@gsap/react';
import { Textz } from '../Util/Tezt';
import { useRef } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  title: string;
  contentPreview: string;
  link: string
}

export const Work = ({ title, contentPreview ,link }: Props) => {
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
      <Link href={link} target='_blank'>
        <div className='min-h-[150px] w-full cursor-pointer rounded-[16px] border-[1px] border-[#00000028] p-[15px] dark:border-[#65656563] flex gap-[10px] items-center'>
           
            <Image src={'/threads.png'} width={200} height={100} alt={title} className='rounded-[10px]'/>
           <div><Textz text={title} bold className='selection:!bg-[#3bafd9]' />
          <Textz
            text={contentPreview}
            className='line-clamp-2 dark:selection:bg-[#3bafd9]'
            delay={200}
          /></div>
          
        </div>
      </Link>
    </div>
  );
};
