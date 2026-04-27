'use client';
import { Box } from '@/components/Util/Box';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { BoxBlock } from '../Common/BoxBlock';
import { useHTTPieStore, KVParam } from '@/store/app/httpiez';
import { find } from 'lodash';

const options = {
  params: 'Params',
  headers: 'Headers',
  body: 'Body',
};

export const ParamsDivision = () => {
  const [currentOption, setCurrentOption] = useState(options.params);

  const selectedRequestId = useHTTPieStore((state) => state.selectedRequestId);
  const collection = useHTTPieStore((state) => state.collection);
  const updateRequestParams = useHTTPieStore(
    (state) => state.updateRequestParams,
  );
  const updateRequestBody = useHTTPieStore((state) => state.updateRequestBody);

  const currentRequest = useMemo(
    () => find(collection, { id: selectedRequestId }),
    [collection, selectedRequestId],
  );

  if (!currentRequest) return null;

  const currentListContext =
    currentOption === options.params
      ? 'params'
      : currentOption === options.headers
        ? 'headers'
        : 'auth';

  const list: KVParam[] =
    currentOption === options.body
      ? []
      : currentRequest.params[currentListContext as 'params' | 'headers'] || [];

  const handleUpdateList = (newList: KVParam[]) => {
    updateRequestParams(
      selectedRequestId,
      currentListContext as 'params' | 'headers',
      newList,
    );
  };

  function setOnOffParam(id: number) {
    const newList = list.map((item) =>
      item.id === id ? { ...item, isActive: !item.isActive } : item,
    );
    handleUpdateList(newList);
  }

  function onChangeNameParam(id: number, name: string) {
    const newList = list.map((item) =>
      item.id === id ? { ...item, name } : item,
    );
    // Auto insert an empty row if editing the last row
    if (newList[newList.length - 1].id === id && name.trim() !== '') {
      newList.push({ id: Date.now(), name: '', value: '', isActive: true });
    }
    handleUpdateList(newList);
  }

  function onChangeValueParam(id: number, value: string) {
    const newList = list.map((item) =>
      item.id === id ? { ...item, value } : item,
    );
    if (newList[newList.length - 1].id === id && value.trim() !== '') {
      newList.push({ id: Date.now(), name: '', value: '', isActive: true });
    }
    handleUpdateList(newList);
  }

  function onRemoveParam(id: number) {
    if (list.length === 1) return;
    const newList = list.filter((item) => item.id !== id);
    handleUpdateList(newList);
  }

  return (
    <>
      <Box className='flex h-full w-[350px] flex-col rounded-[15px]! bg-[#f5f5f0] p-[5px]'>
        <div className='flex flex-none gap-[5px]'>
          {Object.values(options).map((i, idx) => (
            <BoxBlock
              onClick={() => setCurrentOption(i)}
              key={idx}
              className={clsx(currentOption === i && 'bg-[#e0e0e0]')}
            >
              {i}
            </BoxBlock>
          ))}
        </div>

        <div className='mt-[10px] flex w-full flex-1 flex-col overflow-y-auto px-[10px] pb-4'>
          {currentOption === options.body ? (
            <textarea
              className='w-full flex-1 rounded-lg border border-gray-300 p-2 font-mono text-sm focus:ring-1 focus:ring-[#979797] focus:outline-none'
              placeholder='{"key": "value"}'
              value={currentRequest.params.bodyText || ''}
              onChange={(e) =>
                updateRequestBody(selectedRequestId, e.target.value)
              }
            />
          ) : (
            list.map(({ id, isActive, name, value }, index) => (
              <div
                className='group mt-1 flex h-[30px] w-full items-center gap-[5px]'
                key={id}
              >
                <div
                  className='flex h-full w-[20px]! cursor-pointer items-center justify-center rounded select-none hover:bg-gray-200'
                  onClick={() => setOnOffParam(id)}
                >
                  {isActive ? '✓' : ''}
                </div>
                <div className='h-full flex-1'>
                  <input
                    type='text'
                    placeholder='Key'
                    className={clsx(
                      'h-full w-full rounded-[8px] border-[1px] border-transparent px-[5px] focus:border-[#979797] focus:outline-0',
                      !isActive && 'line-through opacity-50',
                    )}
                    value={name}
                    onChange={(event) =>
                      onChangeNameParam(id, event.target.value)
                    }
                  />
                </div>
                <div className='h-full flex-1'>
                  <input
                    type='text'
                    placeholder='Value'
                    className={clsx(
                      'h-full w-full rounded-[8px] border-[1px] border-transparent px-[5px] focus:border-[#979797] focus:outline-0',
                      !isActive && 'line-through opacity-50',
                    )}
                    value={value}
                    onChange={(event) =>
                      onChangeValueParam(id, event.target.value)
                    }
                  />
                </div>
                <div
                  className='flex h-full w-[20px] cursor-pointer items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500'
                  onClick={() => onRemoveParam(id)}
                >
                  ✕
                </div>
              </div>
            ))
          )}
        </div>
      </Box>
    </>
  );
};
