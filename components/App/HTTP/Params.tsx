'use client';
import { Box } from '@/components/Util/Box';
import clsx from 'clsx';
import { cloneDeep, find, findIndex } from 'lodash';
import { useState } from 'react';
import { useImmer } from 'use-immer';

const options = {
  params: 'Params',
  headers: 'Headers',
  auth: 'Auth',
  body: 'Body',
};

const defaultParams = {
  params: {},
  headers: {},
  auth: {},
  body: {},
};

export const ParamsDivision = () => {
  const [currentOption, setCurrentOption] = useState(options.params);

  const [params, setParams] = useState([
    {
      name: 'a',
      value: 'b',
      isActive: true,
      id: 12121,
    },
    {
      name: 'asdff',
      value: 'basdf',
      isActive: false,
      id: 22222,
    },
  ]);
  const [headers, setHeaders] = useState({});
  const [auth, setAuth] = useState({});
  const [body, setBody] = useState({});

  function onSelectOption(option: string) {
    setCurrentOption(option);
  }

  function setOnOffParam(id: number) {
    const idx = findIndex(params, { id: id });
    const _params = cloneDeep(params);
    _params[idx].isActive = !_params[idx].isActive;
    setParams(() => _params);
  }

  function onChangeNameParam(id: number, name: string) {
    const idx = findIndex(params, { id: id });
    const _params = cloneDeep(params);
    _params[idx].name = name;
    setParams(() => _params);
  }

  function onChangeValueParam(id: number, value: string) {
    const idx = findIndex(params, { id: id });
    const _params = cloneDeep(params);
    _params[idx].value = value;
    setParams(() => _params);
  }
  return (
    <>
      <Box className='w-[350px] rounded-[15px]! p-[5px]'>
        <div className='flex'>
          {Object.values(options).map((i, idx) => (
            <Box
              onClick={() => onSelectOption(i)}
              key={idx}
              className={clsx(
                'flex h-[35px]! cursor-pointer items-center justify-center rounded-[10px]! px-[15px]',
                currentOption === i ? 'border' : 'border-transparent',
              )}
            >
              {i}
            </Box>
          ))}
        </div>
        <div className='mt-[10px] flex h-[500px] w-full flex-col px-[10px]'>
          {params.map(({ id, isActive, name, value }) => (
            <div
              className='flex h-[30px] w-full items-center gap-[5px]'
              key={id}
            >
              <div
                className='flex h-full w-[20px]! items-center justify-center select-none'
                onClick={() => setOnOffParam(id)}
              >
                {isActive ? 'x' : 'v'}
              </div>
              <div className='h-full flex-1'>
                <input
                  type='text'
                  placeholder='name'
                  className='h-full w-full rounded-[8px] border-[1px] border-transparent px-[5px] focus:border-[#979797] focus:outline-0'
                  value={name}
                  onChange={(event) =>
                    onChangeNameParam(id, event.target.value)
                  }
                />
              </div>
              <div className='h-full flex-1'>
                <input
                  type='text'
                  placeholder='value'
                  className='h-full w-full rounded-[8px] border-[1px] border-transparent px-[5px] focus:border-[#979797] focus:outline-0'
                  value={value}
                  onChange={(event) =>
                    onChangeValueParam(id, event.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </Box>
    </>
  );
};
