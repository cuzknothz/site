import { useGSAP } from '@gsap/react';
import { TextScramble } from '../Util/TextScramble';
import { useRef } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  title: string;
  content: string;
  link: string;
  image: string;
}

export const Work = ({ title, content, link, image = '' }: Props) => {
  const articleRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from(articleRef.current, {
      y: '200',
      rotate: 'random([-15, 15])',
    });
  }, []);
  return (
    <div ref={articleRef}>
      <Link href={link} target='_blank'>
        <div className='flex w-full cursor-pointer items-center gap-2.5 rounded-2xl border border-[#00000028] p-2.5 px-[15px] dark:border-[#65656563]'>
          <Image
            src={image}
            width={160}
            height={60}
            alt={title}
            className='rounded-[10px]'
          />
          <div>
            <TextScramble
              text={title}
              bold
              className='selection:bg-[#3bafd9]!'
            />
            <TextScramble
              text={content}
              className='line-clamp-2 dark:selection:bg-[#3bafd9]'
              delay={200}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};
