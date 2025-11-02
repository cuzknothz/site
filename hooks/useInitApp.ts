import { useEffect, useRef, useState } from 'react';

export const useInitApp = (cb: Function = () => {}, time = 2000) => {
  const timer = useRef<NodeJS.Timeout>(null);
  const [initPending, setInitPending] = useState(true);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setInitPending(false);
      cb();
    }, time);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return {
    initPending,
  };
};
