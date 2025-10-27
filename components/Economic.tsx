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
      const nextDay = format(addDays(new Date(), 1), 'yyyy-MM-dd');
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

  return (
    <div>
      <Textz
        bold
        text={`Important Economic Event Today ${format(new Date(), 'dd-MM-yyyy')}`}
        className='mb-2.5'
      />
      <table className='w-full border-collapse border border-gray-400'>
        <thead>
          <tr className='h-[30px]'>
            <th className='w-[50px] border border-gray-300'>
              <Textz text='Time' />
            </th>
            <th className='w-[55px] border border-gray-300'>
              <Textz text='Country' />
            </th>
            <th className='w-[200px] border border-gray-300'>
              <Textz text='Event' />
            </th>
            {/* <th className='border border-gray-300'>Pre | Fcast | Actual</th> */}
          </tr>
        </thead>
        <tbody>
          {state.map((i, idx) => (
            <tr key={idx} className=''>
              <td className='border border-gray-300 text-center'>
                {vnTime(i.date, 'HH:mm')}
              </td>
              <td className='border border-gray-300'>
                <div className='flex h-full w-full items-center justify-center'>
                  <Image
                    src={`https://s3-symbol-logo.tradingview.com/country/${i.country}.svg`}
                    alt='Country'
                    width={15}
                    height={15}
                  />
                </div>
              </td>

              <td className='border border-gray-300 px-2.5'>
                <div className='line-clamp-1' title={i.comment}>
                  <Textz text={i.indicator} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
