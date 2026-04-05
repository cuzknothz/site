'use client';

import { Box } from '@/components/Util/Box';
import { useHTTPieStore } from '@/store/app/httpiez';
import axios from 'axios';
import clsx from 'clsx';
import { find } from 'lodash';
import { useMemo, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

const httpMethod = {
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  put: 'PUT',
  delete: 'DELETE',
};

const colorHttpMethodObjMap: Record<string, string> = {
  [httpMethod.get]: '#869e00',
  [httpMethod.post]: '#869e00',
  [httpMethod.patch]: '#d97727',
  [httpMethod.put]: '#d97727',
  [httpMethod.delete]: '#c7382e',
};

export const TopBar = () => {
  const listHTTPMethodRef = useRef<HTMLDivElement>(null);
  const [showHTTPMethod, setShowHTTPMethod] = useState(false);
  const [sending, setSending] = useState(false);
  const selectedRequestId = useHTTPieStore((_) => _.selectedRequestId);
  const collection = useHTTPieStore((_) => _.collection);
  const updateRequestInfo = useHTTPieStore((_) => _.updateRequestInfo);
  const updateResponse = useHTTPieStore((_) => _.updateResponse);

  const currentRequest = useMemo(() => {
    return find(collection, { id: selectedRequestId });
  }, [collection, selectedRequestId]);

  const onSetHttpMethod = (method: string) => {
    updateRequestInfo(selectedRequestId, { method });
    setShowHTTPMethod(false);
  };

  const onShowAllHTTPMethod = () => {
    setShowHTTPMethod(true);
  };

  async function onSending() {
    if (!currentRequest) return;
    setSending(true);
    
    // Set a generic loading response
    updateResponse(selectedRequestId, { loading: true, status: 0, statusText: 'Sending...', data: null, headers: {} });

    try {
      const activeParams = currentRequest.params.params.filter(p => p.isActive && p.name).reduce((acc, p) => ({ ...acc, [p.name]: p.value }), {});
      const activeHeaders = currentRequest.params.headers.filter(h => h.isActive && h.name).reduce((acc, h) => ({ ...acc, [h.name]: h.value }), {});
      
      let parsedBody = null;
      if (currentRequest.method !== 'GET' && currentRequest.params.bodyText) {
        try {
          parsedBody = JSON.parse(currentRequest.params.bodyText);
        } catch {
          parsedBody = currentRequest.params.bodyText; // fallback as raw text
        }
      }

      const res = await axios.post('/api/httppie', {
        url: currentRequest.url,
        method: currentRequest.method,
        params: activeParams,
        headers: activeHeaders,
        body: parsedBody
      });
      
      updateResponse(selectedRequestId, {
        status: res.data.status,
        statusText: res.data.statusText,
        headers: res.data.headers,
        data: res.data.data
      });
    } catch (err: any) {
      console.log('err', String(err));
      updateResponse(selectedRequestId, {
         status: 500,
         statusText: 'Internal Error',
         headers: {},
         data: null,
         error: String(err)
      });
    }

    setSending(false);
  }

  useClickAway(listHTTPMethodRef, () => setShowHTTPMethod(false));

  const onChangeURL = (val: string) => {
    updateRequestInfo(selectedRequestId, { url: val });
  };

  if (!currentRequest) return null;

  return (
    <Box className='flex h-[45px] items-center justify-between gap-2.5 rounded-[15px]! bg-[#f5f5f0] px-[5px]'>
      <div className='relative flex w-[70px] justify-center text-[#000000]'>
        <div className='flex items-center cursor-pointer' onClick={onShowAllHTTPMethod}>
          <p style={{ color: colorHttpMethodObjMap[currentRequest.method] || '#869e00' }}>{currentRequest.method}</p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='15'
            height='15'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='m7 15 5 5 5-5' />
            <path d='m7 9 5-5 5 5' />
          </svg>
        </div>
        {showHTTPMethod && (
          <div ref={listHTTPMethodRef}>
            <Box className='absolute top-[25px] left-[-5px] bg-[#fafaf5] p-[8px] z-50 shadow-lg border border-gray-200'>
              {Object.values(httpMethod).map((i, idx) => (
                <div
                  className='flex items-center gap-[5px] rounded-[8px] hover:bg-[#e0e0e0] px-2 py-1'
                  key={idx}
                >
                  <div className='aspect-square h-[15px]! w-[15px]! flex-0'>
                    {currentRequest.method === i && (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='15'
                        height='15'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path d='M20 6 9 17l-5-5' />
                      </svg>
                    )}
                  </div>
                  <div
                    className='flex h-[25px] flex-1 cursor-pointer items-center text-sm'
                    onClick={() => onSetHttpMethod(i)}
                    style={{ color: colorHttpMethodObjMap[i] }}
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
        value={currentRequest.url}
        placeholder='https://example.com/'
        className='h-full flex-1 focus:outline-0 bg-transparent'
        onChange={(event) => onChangeURL(event.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSending();
        }}
      />
      <Box
        onClick={onSending}
        className={clsx(
          'flex h-[35px]! cursor-pointer items-center justify-center rounded-[10px]! px-[10px]',
          sending ? 'bg-[#c9c9c9]' : 'bg-[#9dff00] hover:bg-[#8ee600]',
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
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='ml-[5px] animate-spin'
          >
            <path d='M21 12a9 9 0 1 1-6.219-8.56' />
          </svg>
        )}
      </Box>
    </Box>
  );
};
