import { useEffect } from 'react';
import { useIsMobile } from './useDeviceType';
import { sleep } from '@/utils/app';
import { useGlobalStore } from '@/store/global-store';
export const useHiddenMenuNext = () => {
  const setShowFullMenu = useGlobalStore((s) => s.setShowFullMenu);
  const { isMobile } = useIsMobile();
  useEffect(() => {
    if (!isMobile) return;
    const onInit = async () => {
      await sleep(1500);
      setShowFullMenu(false);
    };
    onInit();
  }, []);
};
