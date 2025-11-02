'use client';
import { Economic } from '@/components/Economic';
import { Scrollbar } from '@/components/ScrollBar';
import { TradingViewWidget } from '@/components/TradingView/TradingView';
import { Textz } from '@/components/Util/Tezt';

export default function CarftPage() {
  return (
    <Scrollbar className='fixed! top-0 left-0 flex h-dvh w-screen justify-center'>
      <div className='mx-auto mt-[50px] mb-[150px] w-[80%] max-w-[1000px]'>
        <Textz text='App > Market' className='mb-[10px]' />
        <div className='grid grid-cols-1 gap-[10px] sm:grid-cols-2'>
          <div className='h-[250px] sm:h-[300px]'>
            <TradingViewWidget symbol='BINANCE:BTCUSDT' interval='D' />
          </div>
          <div className='h-[250px] sm:h-[300px]'>
            <TradingViewWidget symbol='FXOPEN:XAUUSD' interval='D' />
          </div>
          <div className='col-span-1 h-[250px] sm:col-span-2 sm:h-[600px]'>
            <TradingViewWidget symbol='BINANCE:ETHUSDT' interval='5' />
          </div>
          {/* <Economic /> */}
        </div>
      </div>
    </Scrollbar>
  );
}
