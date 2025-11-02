'use client';
import ArrowUpRightIcon from '@/assets/svg/arrow-up-right.svg';
import { TextScramble } from '@/components/Util/TextScramble';
import Spline from '@splinetool/react-spline';
import Link from 'next/link';

const link = [
  { platform: 'Github', link: 'https://github.com/nbcgww' },
  // { platform: "Youtube", link: "https://www.youtube.com/@nbcuong" },
];
export default function HomePage() {
  return (
    <div className='flex flex-col gap-5'>
      <div className='relative'>
        <Spline
          scene='https://prod.spline.design/wGWWmsOIBBVIUAb8/scene.splinecode'
          className='[&__canvas]:aspect-3/4! [&__canvas]:w-full!'
        />
        <div className='absolute right-0 bottom-2.5 h-[50px] w-[200px] bg-white dark:bg-black'></div>
      </div>
      <div>
        <TextScramble text='Today' bold className='selection:bg-[#710bf7]!' />
        <TextScramble text='Working as Web developer.' delay={100} />
      </div>
      <div>
        <TextScramble
          text='Link'
          bold
          className='selection:bg-[#710bf7]!'
          delay={300}
        />
        <div>
          {link.map((i, idx) => (
            <Link
              href={i.link}
              key={idx}
              className='flex items-center'
              target='_blank'
            >
              <TextScramble
                text={i.platform}
                className='underline'
                delay={500}
              />
              <ArrowUpRightIcon />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
