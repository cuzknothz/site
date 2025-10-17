'use client';
import { Economic } from '@/components/Economic';
import TradingView from '@/components/TradingView/TradingView';
import Spline from '@splinetool/react-spline';

export default function CarftPage() {
  return (
    <div>
      <Economic />
      <div className='h-[500px] mt-[20px]'>

      <TradingView/>
      </div>
    </div>
  );
}
