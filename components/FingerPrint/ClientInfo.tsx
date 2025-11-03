'use client';

import FingerPrintIcon from '@/assets/svg/finger-print.svg';
import { useInitApp } from '@/hooks/useInitApp';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import axios from 'axios';
import { get, isBoolean, isNil } from 'lodash';
import { useEffect, useState } from 'react';
import { MapPigeon } from '../Map';
import { BackDrop } from '../Util/BackDrop';
import { Box } from '../Util/Box';
import { TextScramble } from '../Util/TextScramble';
import clsx from 'clsx';

export const ClientInfo = () => {
  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const { initPending } = useInitApp();

  const { isLoading, error, data, getData } = useVisitorData(
    { extendedResult: true },
    { immediate: true },
  );

  async function getLatLonFromIP(ip: string) {
    try {
      const res = await axios.get(`/api/fingerprint?ip=${ip}`);
      setLocation(res.data);
    } catch (e) {
      console.error('ERROR', e);
    }
  }
  const [smartSignal, setSmartSignal] = useState();

  useEffect(() => {
    if (data?.ip) {
      getLatLonFromIP(data.ip);
    }
    const getSmartSignal = async () => {
      if (data?.requestId && data?.visitorId) {
        const res = await axios.post('/api/fingerprint', {
          requestId: data.requestId,
          visitorId: data.visitorId,
        });
        setSmartSignal(res.data.signals);
      }
    };

    getSmartSignal();
  }, [data?.requestId, data?.visitorId]);

  function yesNo(val: boolean | undefined) {
    if (!isBoolean(val) || isNil(val)) {
      return '';
    }
    return val ? 'Yes' : 'No';
  }

  function onlyText(val: string | undefined) {
    return val || '';
  }

  return (
    <>
      {initPending && (
        <BackDrop>
          <FingerPrintIcon className='h-[180px] w-[180px] -translate-y-[50px]' />
        </BackDrop>
      )}

      <div>
        <Box className='mb-2.5 px-[15px] py-2.5 sm:p-[15px]'>
          <div>
            <TextScramble text='Your ID' />
            <p className='text-[20px] font-bold text-[#ff8c00]'>
              {onlyText(data?.visitorId)}
            </p>
          </div>
          <div className='mt-2.5 flex flex-wrap gap-x-5 gap-y-2.5'>
            <div>
              <TextScramble text='IP' />
              <p className='font-bold'>{onlyText(data?.ip)}</p>
            </div>

            <div>
              <TextScramble text='Browser' />
              <p className='font-bold'>
                {`${onlyText(data?.browserName)} on  ${onlyText(data?.os)} `}
              </p>
            </div>

            <div>
              <TextScramble text='Incognito' />
              <p
                className={clsx(
                  'font-bold',
                  data?.incognito && 'text-[#ff8c00]',
                )}
              >
                {yesNo(data?.incognito)}
              </p>
            </div>

            <div>
              <TextScramble text='VPN' />
              <p
                className={clsx(
                  'font-bold',
                  get(smartSignal, 'vpn.data.result', false) &&
                    'text-[#ff8c00]',
                )}
              >
                {yesNo(get(smartSignal, 'vpn.data.result', undefined))}
              </p>
            </div>
          </div>
        </Box>
        <MapPigeon lat={location.lat} lon={location.lon} />
      </div>
    </>
  );
};
