'use client';
import { BackDrop } from '@/components/Util/BackDrop';
import { Box } from '@/components/Util/Box';
import { useState } from 'react';

export default function LoginPage() {
  const [userName, setUserName] = useState('');
  const [pw, setPw] = useState('');

  const onLogin = () => {};
  return (
    <BackDrop>
      <Box className='w-[300px] p-[15px] pt-5!'>
        <p className='mb-2.5 text-center text-[13px]'>Login quyền quản trị</p>

        <Box className='h-10 w-full rounded-[10px]!'>
          <input
            value={userName}
            type='text'
            placeholder='Username'
            onChange={(e) => setUserName(e.target.value)}
            className='h-full w-full rounded-[10px] p-2.5 focus:outline-0'
          />
        </Box>

        <Box className='mt-2.5 h-10 w-full rounded-[10px]!'>
          <input
            value={pw}
            type='password'
            placeholder='Password'
            onChange={(e) => setPw(e.target.value)}
            className='h-full w-full rounded-[10px] p-2.5 focus:outline-0'
          />
        </Box>

        <Box className='mt-[15px] flex h-10 cursor-pointer items-center justify-center rounded-[10px]! bg-[#b9f4fc] text-center hover:bg-[#66ff00] active:bg-[#abf888]'>
          OKey
        </Box>
      </Box>
    </BackDrop>
  );
}
