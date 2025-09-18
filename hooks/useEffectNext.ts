import { useEffect, useRef } from 'react';

export const useEffectNext = (
  cb: Function,
  dependencies: React.DependencyList,
) => {
  const mounted = useRef(true);

  useEffect(() => {
    if (!mounted.current) {
      return cb();
    }
    mounted.current = false;
  }, dependencies);
};
