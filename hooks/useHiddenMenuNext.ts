import { useEffect, useRef } from 'react';
import { useIsMobile } from './useDeviceType';
import { sleep } from '@/utils/app';
import { useGlobalStore } from '@/store/global';

export const useHiddenMenuNext = () => {
  const timer = useRef<NodeJS.Timeout>(null);
  const setShowFullMenu = useGlobalStore((s) => s.setShowFullMenu);
  const { isMobile } = useIsMobile();
  useEffect(() => {
    if (!isMobile) return;
    const onInit = async () => {
      timer.current = setTimeout(() => {
        setShowFullMenu(false);
      }, 1_500);
    };
    onInit();
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);
};
