import MoonIcon from '@/assets/svg/moon.svg';
import SunIcon from '@/assets/svg/sun.svg';

import { useGlobalStore } from '@/store/global-store';
import gsap from 'gsap';
import { useRef, useState } from 'react';

export const NightMode = () => {
  const toggleDarkMode = useGlobalStore((state) => state.toggleDarkMode);
  const [isDark, setIsDark] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  function toggle() {
    const tl = gsap.timeline({});
    const handler = () => {
      const htmlElement = document.documentElement;
      const isDark = htmlElement.classList.contains('dark');
      htmlElement.classList[isDark ? 'remove' : 'add']('dark');
      setIsDark(isDark);
    };

    tl.to(containerRef.current, {
      duration: 0.5,
      opacity: 0,
      onComplete: handler,
    }).to(containerRef.current, {
      duration: 0.5,
      opacity: 1,
    });
  }

  return (
    <div>
      <button onClick={toggle} className='cursor-pointer'>
        <div ref={containerRef}>{isDark ? <MoonIcon /> : <SunIcon />}</div>
      </button>
    </div>
  );
};
