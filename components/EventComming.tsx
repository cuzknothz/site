'use client';
import { EconomicEvent } from '@/types/app';
import {  vnTime } from '@/utils/app';
import { useGSAP } from '@gsap/react';
import { format, addDays } from 'date-fns';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
// import useSWR from 'swr';
// const fetcher = (...args) => fetch(...args).then(res => res.json())

export const CommingEvent = () => {
  const [state, setState] = useState<EconomicEvent | null>();
  const today = format(new Date(), 'yyyy-MM-dd');
  const nextDay = format(addDays(new Date(), 1), 'yyyy-MM-dd');
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
      className='fixed top-[5px] right-1/2 h-[20px] w-full translate-x-1/2 overflow-hidden sm:w-[500px]'
      ref={eventParentRef}
    >
      <div
        className='absolute top-0 right-0 w-max translate-x-[100%]'
        ref={eventRef}
      >
        <span> Next Economic Event: </span>
        {state ? (
          <span>{`${vnTime(state.date)} ${state.country} ${state.indicator}`}</span>
        ) : (
          <span> None </span>
        )}
      </div>
    </div>
  );
};
