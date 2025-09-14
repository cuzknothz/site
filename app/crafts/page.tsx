'use client';
import Spline from '@splinetool/react-spline';

export default function CarftPage() {
  return (
    <div className='fixed top-0 left-0 flex h-screen w-screen items-center justify-center [&__*]:select-none'>
      <div className='relative [&__canvas]:!h-[80vh] [&__canvas]:sm:max-w-[500px]'>
        <Spline scene='https://prod.spline.design/EuSCdtdmk4-yN3ly/scene.splinecode' />
        <div className='absolute right-0 bottom-[10px] h-[50px] w-[200px] bg-[#fff] dark:bg-[#000]'></div>
      </div>
    </div>
  );
}
