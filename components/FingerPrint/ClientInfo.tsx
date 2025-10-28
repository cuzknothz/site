'use client';

import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const ClientInfo = () => {
  const { isLoading, error, data, getData } = useVisitorData(
    { extendedResult: true },
    { immediate: true },
  );

  const [smartSignal, setSmartSignal] = useState();

  useEffect(() => {
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
  console.log('data', smartSignal);
  return (
    <div>
      <div>
        <p> {`IP Device: ${data?.ip}`}</p>
        <p> {`Trình Duyệt: ${data?.browserName} ${data?.browserVersion}`}</p>
        <p>{`Tab Ẩn Danh: ${smartSignal?.incognito?.data?.result}`}</p>
        <p> {`Hệ điều hành: ${data?.os} ${data?.osVersion}`}</p>
        <p>
          {`VPN: ${smartSignal?.vpn?.data?.result ? 'Có dùng' : 'Không dùng'}, Quốc gia gốc VPN: ${smartSignal?.vpn?.data?.originCountry}, Quốc gia gốc VPN TimeZone: ${smartSignal?.vpn?.data?.originTimezone}`}
        </p>
      </div>
    </div>
  );
};
