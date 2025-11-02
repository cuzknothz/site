import { useEffect, useRef, useState } from 'react';


export const useInitApp = (cb: Function = () => {}) => {
  const timer = useRef<NodeJS.Timeout>(null);
  const [initPending, setInitPending] = useState(true);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setInitPending(false);
      cb();
    }, 1000);

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
