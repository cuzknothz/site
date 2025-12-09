'use client';
import { useSecretStore } from '@/store/secret';
import { BackDrop } from './Util/BackDrop';
import { InputBlink } from './Util/InputBlink';

export const EnterSecret = () => {
  const isShow = useSecretStore((state) => state.isShow);
  return (
    <>
      {isShow && (
        <BackDrop>
          <div className='w-[300px] rounded-2xl border border-[#00000028] px-[15px] pt-[25px] pb-[15px]'>
            <p className='text-[13px] select-none'>
              Enter secret key to view content
            </p>
            <InputBlink />
            <div className='flex w-full justify-between'>
              <p>OK</p>
              <p>Cancel</p>
            </div>
          </div>
        </BackDrop>
      )}
    </>
  );
};
