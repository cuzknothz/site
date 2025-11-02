'use client';
import { Scrollbar } from '@/components/ScrollBar';
import { Chart } from '@/components/TradingView/TradingView';
import { BackDrop } from '@/components/Util/BackDrop';
import { TextScramble } from '@/components/Util/TextScramble';
import { useInitApp } from '@/hooks/useInitApp';
import ThreeChartIcon from '@/assets/svg/3chart.svg';

export default function ChartPage() {
  const { initPending } = useInitApp(() => {}, 3000);

  return (
    <>
      {initPending && (
        <BackDrop>
          <ThreeChartIcon className='h-[180px] w-[180px] translate-y-[-50px]' />
        </BackDrop>
      )}
      <Scrollbar className='fixed! top-0 left-0 flex h-dvh w-screen justify-center'>
        <div className='mx-auto mt-[50px] mb-[150px] w-[80%] max-w-[1000px]'>
          <div className='sm: grid grid-cols-1 gap-[10px] gap-[20px] sm:grid-cols-2'>
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
    </>
  );
}
