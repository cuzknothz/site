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

  const currentRequest = useMemo(() => find(collection, { id: selectedRequestId }), [collection, selectedRequestId]);

  if (!currentRequest) return null;

  const { response, method, url } = currentRequest;

  return (
    <>
      <Box className='flex-1 rounded-[15px]! bg-[#fafaf5] p-[5px] flex flex-col h-full overflow-hidden'>
        <div className='flex gap-[5px] flex-none'>
          <BoxBlock
            onClick={() => setTab(TAB.REQ)}
            className={clsx('', tab === TAB.REQ && 'bg-[#e0e0e0]')}
          >
            <div>Request</div>
            <div className='text-[#869e00] text-sm ml-1 font-mono uppercase'>{method}</div>
          </BoxBlock>
          <BoxBlock
            onClick={() => setTab(TAB.RES)}
            className={clsx('', tab === TAB.RES && 'bg-[#e0e0e0]')}
          >
            <div>Response</div>
            {response && (
              <div className={clsx('text-sm ml-2 font-mono', response.status >= 400 ? 'text-red-500' : 'text-[#869e00]')}>
                {response.status > 0 ? response.status : ''}
              </div>
            )}
          </BoxBlock>
        </div>
        
        <div className='mt-[10px] flex-1 bg-white border border-gray-200 rounded-lg p-3 overflow-y-auto font-mono text-sm shadow-inner'>
          {tab === TAB.REQ && (
            <div className='whitespace-pre-wrap break-all text-gray-700'>
              <div className='font-bold text-gray-900 mb-2'>Target URL:</div>
              {url || 'No URL specified.'}
              
              <div className='font-bold text-gray-900 mt-4 mb-2'>Send Payload:</div>
              <pre className='overflow-x-auto'>{JSON.stringify({ 
                method: currentRequest.method, 
                params: currentRequest.params.params.filter(p => p.isActive && p.name).reduce((a,c)=>({...a, [c.name]: c.value}), {}),
                headers: currentRequest.params.headers.filter(h => h.isActive && h.name).reduce((a,c)=>({...a, [c.name]: c.value}), {}),
                body: currentRequest.params.bodyText 
              }, null, 2)}</pre>
            </div>
          )}
          {tab === TAB.RES && (
            <div className='whitespace-pre-wrap break-all'>
               {!response ? (
                 <div className='text-gray-400 italic mt-4 text-center'>No response yet. Click "Send" to execute request.</div>
               ) : response.error ? (
                 <div className='text-red-500 font-bold'>Error: {response.error}</div>
               ) : (response as any).loading ? (
                 <div className='flex items-center justify-center h-full text-gray-500 animate-pulse mt-10'>Sending request...</div>
               ) : (
                 <div className='flex flex-col'>
                    <div className='mb-4 pb-2 border-b border-gray-100'>
                      <div className='font-bold text-gray-900'>Status: 
                         <span className={clsx('ml-2 font-normal', response.status >= 400 ? 'text-red-500' : 'text-green-600')}>{response.status} {response.statusText}</span>
                      </div>
                    </div>
                    {response.headers && Object.keys(response.headers).length > 0 && (
                      <div className='mb-4'>
                        <div className='font-bold text-gray-900 text-xs text-gray-400 uppercase tracking-widest mb-1'>Headers</div>
                        <pre className='text-xs text-gray-600 bg-gray-50 p-2 rounded overflow-x-auto'>{JSON.stringify(response.headers, null, 2)}</pre>
                      </div>
                    )}
                    <div>
                        <div className='font-bold text-gray-900 text-xs text-gray-400 uppercase tracking-widest mb-1'>Body</div>
                        <pre className='text-gray-800 bg-gray-50 p-2 rounded overflow-x-auto'>
                          {typeof response.data === 'object' ? JSON.stringify(response.data, null, 2) : String(response.data)}
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
