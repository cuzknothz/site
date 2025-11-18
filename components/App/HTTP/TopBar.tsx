'use client';

import { Box } from '@/components/Util/Box';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';

const httpMethod = {
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  put: 'PUT',
  delete: 'DELETE',
};

export const TopBar = () => {
  const listHTTPMethodRef = useRef<HTMLDivElement>(null);
  const [currentHttpMethod, setCurrentHTTPMethod] = useState(httpMethod.get);
  const [showHTTPMethod, setShowHTTPMethod] = useState(false);
  const [sending, setSending] = useState(false);

  const onSetHttpMethod = (method: string) => {
    setCurrentHTTPMethod(method);
    setShowHTTPMethod(false);
  };

  const onShowAllHTTPMethod = () => {
    setShowHTTPMethod(true);
  };

  function onSending() {
    setSending(true);

    setTimeout(() => {
      setSending(false);
    }, 5000);
  }

  useClickAway(listHTTPMethodRef, () => setShowHTTPMethod(false));

  return (
    <Box className='flex h-[45px] items-center justify-between gap-2.5 rounded-[15px]! px-[5px]'>
      <div className='relative flex w-[70px] justify-center text-[#000000]'>
        <div className='flex items-center' onClick={onShowAllHTTPMethod}>
          <p>{currentHttpMethod}</p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='15'
            height='15'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path d='m7 15 5 5 5-5' />
            <path d='m7 9 5-5 5 5' />
          </svg>
        </div>
        {showHTTPMethod && (
          <div ref={listHTTPMethodRef}>
            <Box className='absolute top-5 left-[-5px] bg-white p-2.5'>
              {Object.values(httpMethod).map((i, idx) => (
                <div className='flex' key={idx}>
                  <div className='w-2.5'>{currentHttpMethod === i && 'x'}</div>
                  <div
                    className='h-[25px] cursor-pointer'
                    onClick={() => onSetHttpMethod(i)}
                  >
                    {i}
                  </div>
                  <div className='w-2.5'></div>
                </div>
              ))}
            </Box>
          </div>
        )}
      </div>
      <input
        type='text'
        placeholder='https://example.com/'
        className='h-full flex-1 focus:outline-0'
      />
      <Box
        onClick={onSending}
        className={clsx(
          'flex h-[35px]! cursor-pointer items-center justify-center rounded-[10px]! px-[10px]',
          sending ? 'bg-[#c9c9c9]' : 'bg-[#9dff00]',
        )}
      >
        {sending ? 'Sending' : 'Send'}
        {sending && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            className='ml-[5px] animate-spin'
          >
            <path d='M21 12a9 9 0 1 1-6.219-8.56' />
          </svg>
        )}
      </Box>
    </Box>
  );
};
