'use client';
import ArrowUpRightIcon from '@/assets/svg/arrow-up-right.svg';
import { TextScramble } from '@/components/Util/TextScramble';
import { lazy, Suspense, useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Spline = lazy(() => import('@splinetool/react-spline'));

const link = [
  { platform: 'Github', link: 'https://github.com/cuzknothz' },
  { platform: 'Youtube', link: 'https://www.youtube.com/@cuzknothz' },
];
export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to('svg', {
        rotate: 360,
        stagger: {
          each: 0.05,
        },
        delay: 1,
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className='flex flex-col gap-5'>
      <div className='relative aspect-3/4! w-full!'>
        <Suspense
          fallback={
            <div className='absolute right-0 bottom-2.5 h-[50px] w-[200px] bg-white dark:bg-black'>
              Loading 3D scene...
            </div>
          }
        >
          <Spline
            scene='https://prod.spline.design/wGWWmsOIBBVIUAb8/scene.splinecode'
            className='[&__canvas]:aspect-3/4! [&__canvas]:w-full!'
          />
        </Suspense>
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
        <div className='flex gap-2'>
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
                delay={500 + idx * 200}
              />
              <ArrowUpRightIcon />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
