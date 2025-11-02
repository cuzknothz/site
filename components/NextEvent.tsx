'use client';
import { eventMitt } from '@/helper/event';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useMemo, useRef, useState } from 'react';

const SPEED_PX_PER_SEC = 120;
const HIDE_DELAY_MS = 200;

export const NextEvent = () => {
  const [message, setMessage] = useState<string>('');
  const eventRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  const playOnce = () => {
    if (!message) return;
    const parentW = parentRef.current?.offsetWidth ?? 0;
    const eventW = eventRef.current?.offsetWidth ?? 0;

    const distance = parentW + eventW;

    const duration = Math.min(Math.max(distance / SPEED_PX_PER_SEC, 2), 30);

    tlRef.current?.kill();

    if (reducedMotion) {
      gsap.set(eventRef.current, { right: 0 });
      window.setTimeout(() => setMessage(''), 2000);
      return;
    }

    gsap.set(eventRef.current, { right: -eventW });

    const tl = gsap.timeline({
      onComplete: () => {
        window.setTimeout(() => setMessage(''), HIDE_DELAY_MS);
      },
    });

    tl.to(eventRef.current, {
      right: distance,
      duration,
      ease: 'none',
    });

    tlRef.current = tl;
  };

  useGSAP(() => {
    if (message) playOnce();
    return () => tlRef.current?.kill();
  }, [message]);

  useEffect(() => {
    const handler = () => {
      setMessage(`🟢 New Chat created`);
    };
    eventMitt.on('newChat', handler);
    return () => eventMitt.off('newChat', handler);
  }, []);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      if (message) playOnce();
    });
    if (parentRef.current) ro.observe(parentRef.current);
    if (eventRef.current) ro.observe(eventRef.current);
    return () => ro.disconnect();
  }, [message]);

  return (
    <div
      ref={parentRef}
      className='pointer-events-none fixed top-[5px] right-1/2 z-200 h-5 w-full translate-x-1/2 overflow-hidden'
    >
      {message && (
        <div
          ref={eventRef}
          className='absolute top-0 right-0 flex w-max gap-2 whitespace-nowrap'
        >
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};
