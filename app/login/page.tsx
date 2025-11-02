'use client';
import { Box } from '@/components/Util/Box';
import { BackDrop } from '@/components/Util/BackDrop';
import { useState } from 'react';

export default function LoginPage() {
  const [userName, setUserName] = useState('');
  const [pw, setPw] = useState('');

  const onLogin = () => {};
  return (
    <BackDrop>
      <Box className='w-[300px] p-[15px] pt-[20px]!'>
        <p className='mb-[10px] text-center text-[13px]'>
          Login quyền quản trị
        </p>

        <Box className='h-[40px] w-full rounded-[10px]!'>
          <input
            value={userName}
            type='text'
            placeholder='Username'
            onChange={(e) => setUserName(e.target.value)}
            className='h-full w-full rounded-[10px] p-[10px] focus:outline-0'
          />
        </Box>

        <Box className='mt-[10px] h-[40px] w-full rounded-[10px]!'>
          <input
            value={pw}
            type='password'
            placeholder='Password'
            onChange={(e) => setPw(e.target.value)}
            className='h-full w-full rounded-[10px] p-[10px] focus:outline-0'
          />
        </Box>

        <Box className='mt-[15px] flex h-[40px] cursor-pointer items-center justify-center rounded-[10px]! bg-[#b9f4fc] text-center hover:bg-[#66ff00] active:bg-[#abf888]'>
          OKey
        </Box>
      </Box>
    </BackDrop>
  );
}
