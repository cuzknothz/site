'use client';

import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MapPigeon } from '../Map';
import { isBoolean } from 'lodash';

export const ClientInfo = () => {
  const [location, setLocation] = useState({ lat: 0, lon: 0 });

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
  console.log('location', location);

  console.log('data', data);

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
        console.log('res', res.data);
        setSmartSignal(res.data.signals);
      }
    };

    getSmartSignal();
  }, [data?.requestId, data?.visitorId]);
  // console.log('data', smartSignal);

  function isDetected(val: boolean) {
    if (!isBoolean(val)) {
      return '';
    }
    return val ? 'Detected' : 'Not Detected';
  }
  function yesNo(val: boolean) {
    if (!isBoolean(val)) {
      return '';
    }
    return val ? 'Yes' : 'No';
  }

  return (
    <div>
      <MapPigeon lat={location.lat} lon={location.lon} />

      <div className='mt-[20px]'>
        <div className='flex gap-[5px]'>
          <p> IP Device:</p>
          <p className='text-[#a206fc]'>{data?.ip || ''}</p>
        </div>

        <div className='flex gap-[5px]'>
          <p> Trình Duyệt:</p>
          <p className='text-[#a206fc]'>
            {`${data?.browserName || ''} ${data?.browserVersion || ''} `}
          </p>
        </div>

        <div className='flex gap-[5px]'>
          <p> Tab Ẩn Danh:</p>
          <p className='text-[#a206fc]'>
            {yesNo(smartSignal?.incognito?.data?.result)}
          </p>
        </div>
        <div className='flex gap-[5px]'>
          <p> Hệ điều hành:</p>
          <p className='text-[#a206fc]'>
            {`${data?.os || ''} ${data?.osVersion || ''}`}
          </p>
        </div>

        <div className='flex gap-[5px]'>
          <p> VPN:</p>
          <p className='text-[#a206fc]'>
            {isDetected(smartSignal?.vpn?.data?.result)}
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};
