'use client';

import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MapPigeon } from '../Map';

export const ClientInfo = () => {
  const [location, setLocation] = useState({ lat: 0, lon: 0 });

  const { isLoading, error, data, getData } = useVisitorData(
    { extendedResult: true },
    { immediate: true },
  );

  async function getLatLonFromIP(ip: string) {
    try {
      const res = await axios.get(`/api/fingerprint?ip=${ip}`);
      debugger;
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
  return (
    <div>
      <MapPigeon lat={location.lat} lon={location.lon} />

      <div className='mt-[10px]'>
        <p> {`IP Device: ${data?.ip}`}</p>
        <p> {`Trình Duyệt: ${data?.browserName} ${data?.browserVersion}`}</p>
        <p>{`Tab Ẩn Danh: ${smartSignal?.incognito?.data?.result}`}</p>
        <p> {`Hệ điều hành: ${data?.os} ${data?.osVersion}`}</p>
        <p>
          {`VPN: ${smartSignal?.vpn?.data?.result ? 'Có dùng' : 'Không dùng'}, Quốc gia gốc VPN: ${smartSignal?.vpn?.data?.originCountry}, Quốc gia gốc VPN TimeZone: ${smartSignal?.vpn?.data?.originTimezone}`}
        </p>
      </div>
      <div></div>
    </div>
  );
};
