'use client';
import { Chat } from '@/components/Chat/Chat';
import { useIsMobile } from '@/hooks/useDeviceType';
import { useGlobalStore } from '@/store/global-store';
import { useEffect } from 'react';

export default function CarftPage() {
  const setShowFullMenu = useGlobalStore((s) => s.setShowFullMenu);
  const { isMobile } = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setShowFullMenu(false);
    }
  }, []);

  return (
    <div>
      <Chat />
    </div>
  );
}
