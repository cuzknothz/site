'use client';
import { EconomicEvent } from '@/types/app';
import { vnTime } from '@/utils/app';
import { format, addDays } from 'date-fns';
import { useEffect, useState } from 'react';
 
export const CommingEvent = () => {
  const [state, setState] = useState<EconomicEvent | null>();
  useEffect(() => {
    const handler = async () => {
      const today = format(new Date(), 'yyyy-MM-dd');
      const nextDay = format(addDays(new Date(), 1), 'yyyy-MM-dd');
      const res = await fetch(
        `https://chartevents-reuters.tradingview.com/events?minImportance=1&from=${today}T08:00:00.000Z&to=${nextDay}T08:00:00.000Z&countries=US`
      );
      const data = await res.json();
 
      if (data.result[0]) {
        setState(data.result[0]);
      } else {
        setState(null);
      }
 
      console.log('data', data);
    };
    handler();
  }, []);
 
  return (
    <div>
      <marquee>
        <span>Next Important Event Today: </span>
        {state ? (
          <span>{`${vnTime(state.date)} ${state.country} ${state.indicator}`}</span>
        ) : (
          <span> No important event today :)</span>
        )}
      </marquee>
    </div>
  );
};