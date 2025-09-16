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
      <Textz bold text='Important Economic Event Today' className='mb-[10px]' />
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
            <th className='border border-gray-300'>
              <Textz text='Prev' />
            </th>
            <th className='border border-gray-300'>
              <Textz text='Forecast' />
            </th>
            <th className='border border-gray-300'>
              {' '}
              <Textz text='Actual' />
            </th>
          </tr>
        </thead>
        <tbody>
          {state.map((i, idx) => (
            <tr key={idx} className=''>
              <td className='border border-gray-300 text-center'>
               
                 <Textz text={ vnTime(i.date, 'HH:mm')} />
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

              <td className='border border-gray-300'> <Textz text={i.indicator ?? ''} /></td>
              <td className='border border-gray-300 text-center'>
                {i.previous ?? ''}
                
              </td>

              <td className='border border-gray-300 text-center'>
                {i.forecast ?? ''}
              </td>
              <td className='border border-gray-300 bg-[#64d0e8] text-center'>
                {i.actual ?? ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
