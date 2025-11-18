'use client';

import { Box } from '@/components/Util/Box';
import { TextScramble } from '@/components/Util/TextScramble';
import QRCodeStyling from 'qr-code-styling';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

const qrCode = new QRCodeStyling({
  width: 500,
  height: 500,
  dotsOptions: {
    color: '#000',
    type: 'rounded',
  },
  cornersSquareOptions: {
    type: 'extra-rounded',
    color: '#000',
  },
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 20,
  },
});
export default function QRGeneratorPage() {
  const [url, setUrl] = useState('');
  const refEl = useRef<HTMLDivElement>(null);

  // init
  useEffect(() => {
    function onInit() {
      qrCode.append(refEl.current!);
      qrCode.update({
        data: '',
      });
    }

    onInit();
  }, []);

  function onUrlChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const value = event.target.value;
    setUrl(value);
    qrCode.update({
      data: value,
    });
  }

  function onDownloadClick() {
    qrCode.download({
      extension: 'png',
    });
  }

  return (
    <div className='flex flex-col items-center gap-[15px]'>
      <div className='flex w-full flex-col gap-[5px]'>
        <TextScramble text='Link to generate:' />
        <Box className='h-10 w-full overflow-hidden rounded-[10px]!'>
          <input
            value={url}
            onChange={onUrlChange}
            placeholder='https://illuzion.site'
            className='h-full w-full px-2.5 focus:outline-0'
          />
        </Box>
      </div>

      <div
        className='w-full [&>canvas]:h-full! [&>canvas]:w-full!'
        ref={refEl}
      />
      {url && (
        <Box
          onClick={onDownloadClick}
          className='flex h-10 cursor-pointer items-center justify-center rounded-[10px]! bg-[#95ff0a] px-5'
        >
          Download
        </Box>
      )}
    </div>
  );
}
