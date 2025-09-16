'use client';
import { useEffect, useState } from 'react';
import { Textz } from './Util/Tezt';
import { vnTime } from '@/utils/app';
import Image from 'next/image';
import { format, addDays } from 'date-fns';
import { EconomicEvent } from '@/types/app';

export const Economic = () => {
  const [state, setState] = useState<EconomicEvent[]>([]);
  useEffect(() => {
    const handler = async () => {
      const today = format(new Date(), 'yyyy-MM-dd');
      const nextDay = format(addDays(new Date(), 10), 'yyyy-MM-dd');
      const res = await fetch(
        `/api/economic?minImportance=1&from=${today}T00:00:00.000Z&to=${nextDay}T00:00:00.000Z`,
      );
      const data = await res.json();

      setState(data.result);
      console.log('data', data);
    };
    handler();
  }, []);

  const sortDate = () => {};

  const importantIndicator = (val: number) => {
    return (
      <div>
        {val === 1 && <div className='h-[5px] w-[5px] bg-[red]'></div>}
        {val === 2 && <div></div>}
        {val === 3 && <div></div>}
      </div>
    );
  };
  return (
    <div>
      <Textz bold text='🐤Important Economic Event Today' />
      <table className='border-collapse border border-gray-400 ...'>
        <thead>
          <tr>
            <th className='border border-gray-300 ...'>Time</th>
            <th className='border border-gray-300 ...'>Country</th>
            <th className='border border-gray-300 ...'>Important</th>
            <th className='border border-gray-300 ...'>Indicator</th>
          </tr>
        </thead>
        <tbody>
          {state.map((i, idx) => (
            <tr key={idx}>
              <td className='border border-gray-300 ...'>{vnTime(i.date)}</td>
              <td className='border border-gray-300 ...'>
                <Image
                  src={`https://s3-symbol-logo.tradingview.com/country/${i.country}.svg`}
                  alt='Country'
                  width={15}
                  height={15}
                />
              </td>
              <td className='border border-gray-300 ...'>
                {importantIndicator(i.importance)}
              </td>
              <td className='border border-gray-300 ...' title={i.comment}>
                {i.indicator}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
