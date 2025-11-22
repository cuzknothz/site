'use client';

import { Box } from '@/components/Util/Box';
import { useHTTPieStore } from '@/store/app/httpiez';
import axios from 'axios';
import clsx from 'clsx';
import { find } from 'lodash';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

const httpMethod = {
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  put: 'PUT',
  delete: 'DELETE',
};

const colorHttpMethodObjMap = {
  [httpMethod.get]: '#869e00',
  [httpMethod.post]: '#869e00',
  [httpMethod.patch]: '#d97727',
  [httpMethod.put]: '#d97727',
  [httpMethod.delete]: '#c7382e',
};

export const TopBar = () => {
  const listHTTPMethodRef = useRef<HTMLDivElement>(null);
  const [currentHttpMethod, setCurrentHTTPMethod] = useState(httpMethod.get);
  const [showHTTPMethod, setShowHTTPMethod] = useState(false);
  const [sending, setSending] = useState(false);
  const selectedRequestId = useHTTPieStore((_) => _.selectedRequestId);
  const collection = useHTTPieStore((_) => _.collection);

  const currentRequest = useMemo(() => {
    return find(collection, { id: selectedRequestId });
  }, [collection, selectedRequestId]);

  const onSetHttpMethod = (method: string) => {
    setCurrentHTTPMethod(method);
    setShowHTTPMethod(false);
  };

  const onShowAllHTTPMethod = () => {
    setShowHTTPMethod(true);
  };

  async function onSending() {
    setSending(true);

    try {
      const res = await axios.post('/api/httppie', {
        url: currentRequest?.url,
        method: currentRequest?.method,
        // params: params ? JSON.parse(params) : {},
        // headers: headers ? JSON.parse(headers) : {},
        // body: method !== 'GET' ? (body ? JSON.parse(body) : {}) : undefined,
        // auth: (authUser && authPass) ? { username: authUser, password: authPass } : undefined,
      });
      console.log(
        '(JSON.stringify(res.data, null, 2))',
        JSON.stringify(res.data, null, 2),
      );
    } catch (err) {
      console.log('err', String(err));
      // setResponse();
    }

    setTimeout(() => {
      setSending(false);
    }, 5000);
  }

  useClickAway(listHTTPMethodRef, () => setShowHTTPMethod(false));

  const onChangeURL = (val: string) => {};

  const getColorHttp = (method: string | undefined) => {
    if (!method) {
      return '';
    }
    colorHttpMethodObjMap[method] ?? '';
    console.log('colorHttpMethodObjMap[method]', colorHttpMethodObjMap[method]);
  };

  return (
    <Box className='flex h-[45px] items-center justify-between gap-2.5 rounded-[15px]! bg-[#f5f5f0] px-[5px]'>
      <div className='relative flex w-[70px] justify-center text-[#000000]'>
        <div className='flex items-center' onClick={onShowAllHTTPMethod}>
          <p className={clsx(`text-[#869e00]`)}>{currentRequest?.method}</p>
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
            <Box className='absolute top-[25px] left-[-5px] bg-[#fafaf5] p-[8px]'>
              {Object.values(httpMethod).map((i, idx) => (
                <div
                  className='flex items-center gap-[5px] rounded-[8px] hover:bg-[#afafaf]'
                  key={idx}
                >
                  <div className='aspect-square h-[15px]! w-[15px]! flex-0'>
                    {currentHttpMethod === i && (
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
                        <path d='M20 6 9 17l-5-5' />
                      </svg>
                    )}
                  </div>
                  <div
                    className='flex h-[25px] flex-1 cursor-pointer items-center'
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
        value={currentRequest?.url}
        placeholder='https://example.com/'
        className='h-full flex-1 focus:outline-0'
        onChange={(event) => onChangeURL(event.target.value)}
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
