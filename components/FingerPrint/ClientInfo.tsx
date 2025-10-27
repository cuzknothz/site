'use client';

import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { useEffect } from 'react';

export const ClientInfo = () => {
  const { isLoading, error, data, getData } = useVisitorData(
    { extendedResult: true },
    { immediate: true },
  );

  useEffect(() => {
    if (data?.requestId && data?.visitorId) {
      // gửi requestId lên server để server gọi Smart Signals
      fetch('/api/fingerprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: data.requestId,
          visitorId: data.visitorId,
        }),
      }).catch(() => {});
    }
  }, [data?.requestId, data?.visitorId]);
  return (
    <div>
      <button onClick={() => getData({ ignoreCache: true })}>
        Reload data
      </button>
      <p>VisitorId: {isLoading ? 'Loading...' : data?.visitorId}</p>
      <p>Full visitor data:</p>
      <pre>{error ? error.message : JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
