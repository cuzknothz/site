'use client';

import { useEffect, useState } from 'react';

export function useIsMobile(breakpoint: number = 640) {
  const checkForDevice = (): boolean =>
    typeof window !== 'undefined' && window.innerWidth < breakpoint;

  const [isMobile, setIsMobile] = useState<boolean>(checkForDevice());

  useEffect(() => {
    const handlePageResized = () => {
      setIsMobile(checkForDevice());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handlePageResized);
      window.addEventListener('orientationchange', handlePageResized);
      window.addEventListener('load', handlePageResized);
      window.addEventListener('reload', handlePageResized);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handlePageResized);
        window.removeEventListener('orientationchange', handlePageResized);
        window.removeEventListener('load', handlePageResized);
        window.removeEventListener('reload', handlePageResized);
      }
    };
  }, [breakpoint]);

  return { isMobile };
}
