'use client';

import SaveIcon from '@/assets/svg/save.svg';
import { Box } from '@/components/Util/Box';
import { TextScramble } from '@/components/Util/TextScramble';
import { useEffectNext } from '@/hooks/useEffectNext';
import clsx from 'clsx';
import QRCodeStyling from 'qr-code-styling';
import { useEffect, useRef, useState } from 'react';

const URL_SITE = 'https://illuzion.site';

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
  const [initQRFirstTime, setInitQRFirstTime] = useState(true);

  // init
  useEffect(() => {
    function onInit() {
      qrCode.append(refEl.current!);
      qrCode.update({
        data: URL_SITE,
      });
    }
    onInit();
  }, []);

  useEffectNext(() => {
    setInitQRFirstTime(false);
    qrCode.update({
      data: url,
    });
  }, [url]);

  function onDownloadClick() {
    qrCode.download({
      extension: 'png',
    });
  }

  return (
    <div className='flex flex-col items-center gap-[15px]'>
      <div className='flex w-full flex-col gap-[5px]'>
        <TextScramble text='Link to generate:' bold className='h-5' />
        <Box className='h-10 w-full overflow-hidden rounded-[10px]!'>
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder={URL_SITE}
            className='h-full w-full px-2.5 focus:outline-0'
          />
        </Box>
      </div>

      <div
        className={clsx(
          'mt-[15px] aspect-square w-full [&>canvas]:h-full! [&>canvas]:w-full!',
          initQRFirstTime && 'opacity-20',
        )}
        ref={refEl}
      />
      {url && (
        <Box
          onClick={onDownloadClick}
          className='flex h-10 w-full cursor-pointer items-center justify-center gap-[5px] rounded-[15px]! bg-[#95ff0a] px-[50px]'
        >
          <SaveIcon />
          <p>Lưu QR</p>
        </Box>
      )}
    </div>
  );
}
