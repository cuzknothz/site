'use client';
import { EconomicEvent } from '@/types/app';
import { vnTime } from '@/utils/app';
import { useGSAP } from '@gsap/react';
import { addDays, format } from 'date-fns';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
// import useSWR from 'swr';
// const fetcher = (...args) => fetch(...args).then(res => res.json())

export const NextEvent = () => {
  const [state, setState] = useState<EconomicEvent | null>();
  const eventRef = useRef<HTMLDivElement>(null);
  const eventParentRef = useRef<HTMLDivElement>(null);

  // const { data, error } = useSWR(
  //   `/api/economic?minImportance=1&from=${today}T00:00:00.000Z&to=${nextDay}T00:00:00.000Z`,
  //   fetcher,
  // );
  // console.log(data);
  useEffect(() => {
    const handler = async () => {
      const today = format(new Date(), 'yyyy-MM-dd');
      const nextDay = format(addDays(new Date(), 1), 'yyyy-MM-dd');
      const res = await fetch(
        `https://chartevents-reuters.tradingview.com/events?minImportance=1&from=${today}T00:00:00.000Z&to=${nextDay}T00:00:00.000Z`,
      );

      const data = await res.json();

      if (data.result[0]) {
        setState(data.result[0]);
      } else {
        setState(null);
      }
    };
    handler();
  }, []);

  useGSAP(() => {
    const wParent = eventParentRef.current!.getBoundingClientRect().width ?? 0;
    const wEvent = eventRef.current!.getBoundingClientRect().width ?? 0;
    gsap.to(eventRef.current, {
      right: wParent + wEvent,
      duration: 10,
      ease: 'none',
      repeat: -1,
    });
  }, [state]);

  return (
    <div
      className='fixed top-[5px] right-1/2 z-200 h-5 w-full translate-x-1/2 overflow-hidden sm:w-[500px]'
      ref={eventParentRef}
    >
      <div
        className='absolute top-0 right-0 flex w-max translate-x-full gap-[5px]'
        ref={eventRef}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='18'
          height='18'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M16 7h6v6' />
          <path d='m22 7-8.5 8.5-5-5L2 17' />
        </svg>
        <span> Next Economic Event:</span>
        {state ? (
          <span>{`${vnTime(state.date)} ${state.country} ${state.indicator}`}</span>
        ) : (
          <span> None </span>
        )}
      </div>
    </div>
  );
};
