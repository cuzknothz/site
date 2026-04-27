'use client';

import { Box } from '@/components/Util/Box';
import { BoxBlock } from '../Common/BoxBlock';
import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useHTTPieStore } from '@/store/app/httpiez';
import { find } from 'lodash';

enum TAB {
  REQ,
  RES,
}

export const PreviewDivision = () => {
  const [tab, setTab] = useState(TAB.RES);

  const selectedRequestId = useHTTPieStore((state) => state.selectedRequestId);
  const collection = useHTTPieStore((state) => state.collection);

  const currentRequest = useMemo(
    () => find(collection, { id: selectedRequestId }),
    [collection, selectedRequestId],
  );

  if (!currentRequest) return null;

  const { response, method, url } = currentRequest;

  return (
    <>
      <Box className='flex h-full flex-1 flex-col overflow-hidden rounded-[15px]! bg-[#fafaf5] p-[5px]'>
        <div className='flex flex-none gap-[5px]'>
          <BoxBlock
            onClick={() => setTab(TAB.REQ)}
            className={clsx('', tab === TAB.REQ && 'bg-[#e0e0e0]')}
          >
            <div>Request</div>
            <div className='ml-1 font-mono text-sm text-[#869e00] uppercase'>
              {method}
            </div>
          </BoxBlock>
          <BoxBlock
            onClick={() => setTab(TAB.RES)}
            className={clsx('', tab === TAB.RES && 'bg-[#e0e0e0]')}
          >
            <div>Response</div>
            {response && (
              <div
                className={clsx(
                  'ml-2 font-mono text-sm',
                  response.status >= 400 ? 'text-red-500' : 'text-[#869e00]',
                )}
              >
                {response.status > 0 ? response.status : ''}
              </div>
            )}
          </BoxBlock>
        </div>

        <div className='mt-[10px] flex-1 overflow-y-auto rounded-lg border border-gray-200 bg-white p-3 font-mono text-sm shadow-inner'>
          {tab === TAB.REQ && (
            <div className='break-all whitespace-pre-wrap text-gray-700'>
              <div className='mb-2 font-bold text-gray-900'>Target URL:</div>
              {url || 'No URL specified.'}

              <div className='mt-4 mb-2 font-bold text-gray-900'>
                Send Payload:
              </div>
              <pre className='overflow-x-auto'>
                {JSON.stringify(
                  {
                    method: currentRequest.method,
                    params: currentRequest.params.params
                      .filter((p) => p.isActive && p.name)
                      .reduce((a, c) => ({ ...a, [c.name]: c.value }), {}),
                    headers: currentRequest.params.headers
                      .filter((h) => h.isActive && h.name)
                      .reduce((a, c) => ({ ...a, [c.name]: c.value }), {}),
                    body: currentRequest.params.bodyText,
                  },
                  null,
                  2,
                )}
              </pre>
            </div>
          )}
          {tab === TAB.RES && (
            <div className='break-all whitespace-pre-wrap'>
              {!response ? (
                <div className='mt-4 text-center text-gray-400 italic'>
                  No response yet. Click "Send" to execute request.
                </div>
              ) : response.error ? (
                <div className='font-bold text-red-500'>
                  Error: {response.error}
                </div>
              ) : (response as any).loading ? (
                <div className='mt-10 flex h-full animate-pulse items-center justify-center text-gray-500'>
                  Sending request...
                </div>
              ) : (
                <div className='flex flex-col'>
                  <div className='mb-4 border-b border-gray-100 pb-2'>
                    <div className='font-bold text-gray-900'>
                      Status:
                      <span
                        className={clsx(
                          'ml-2 font-normal',
                          response.status >= 400
                            ? 'text-red-500'
                            : 'text-green-600',
                        )}
                      >
                        {response.status} {response.statusText}
                      </span>
                    </div>
                  </div>
                  {response.headers &&
                    Object.keys(response.headers).length > 0 && (
                      <div className='mb-4'>
                        <div className='mb-1 text-xs font-bold tracking-widest text-gray-400 text-gray-900 uppercase'>
                          Headers
                        </div>
                        <pre className='overflow-x-auto rounded bg-gray-50 p-2 text-xs text-gray-600'>
                          {JSON.stringify(response.headers, null, 2)}
                        </pre>
                      </div>
                    )}
                  <div>
                    <div className='mb-1 text-xs font-bold tracking-widest text-gray-400 text-gray-900 uppercase'>
                      Body
                    </div>
                    <pre className='overflow-x-auto rounded bg-gray-50 p-2 text-gray-800'>
                      {typeof response.data === 'object'
                        ? JSON.stringify(response.data, null, 2)
                        : String(response.data)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Box>
    </>
  );
};
