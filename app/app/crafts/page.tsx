'use client';
import { Economic } from '@/components/Economic';
import { TradingViewWidget } from '@/components/TradingView/TradingView';
import Spline from '@splinetool/react-spline';

export default function CarftPage() {
  return (
    <div>
      <div className='mb-[20px]'>
        <div className='flex flex-col gap-[10px]'>
          <TradingViewWidget symbol='BINANCE:ETHUSDT' interval='5' />
          <TradingViewWidget symbol='BINANCE:BTCUSDT' interval='D' />
          <TradingViewWidget symbol='FXOPEN:XAUUSD' interval='D' />
        </div>
      </div>
      <Economic />
    </div>
  );
}
