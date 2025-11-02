'use client';
import { Scrollbar } from '@/components/ScrollBar';
import { Chart } from '@/components/TradingView/TradingView';
import { TextScramble } from '@/components/Util/TextScramble';

export default function ChartPage() {
  return (
    <Scrollbar className='fixed! top-0 left-0 flex h-dvh w-screen justify-center'>
      <div className='mx-auto mt-[50px] mb-[150px] w-[80%] max-w-[1000px]'>
        <TextScramble text='App > Market' className='mb-[10px]' />
        <div className='grid grid-cols-1 gap-[10px] sm:grid-cols-2'>
          <div className='h-[250px] sm:h-[300px]'>
            <Chart symbol='BINANCE:BTCUSDT' interval='D' />
          </div>
          <div className='h-[250px] sm:h-[300px]'>
            <Chart symbol='FXOPEN:XAUUSD' interval='D' />
          </div>
          <div className='col-span-1 h-[250px] sm:col-span-2 sm:h-[600px]'>
            <Chart symbol='BINANCE:ETHUSDT' interval='5' />
          </div>
        </div>
      </div>
    </Scrollbar>
  );
}
