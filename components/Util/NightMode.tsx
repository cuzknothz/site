import MoonIcon from '@/assets/svg/moon.svg';
import SunIcon from '@/assets/svg/sun.svg';
import gsap from 'gsap';
import { Fragment, useEffect, useRef, useState } from 'react';

export const NightMode = () => {
  const [isDark, setIsDark] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const htmlElement = document.documentElement;
    const isDark = htmlElement.classList.contains('dark');
    setIsDark(isDark);
  }, []);
  function toggle() {
    const tl = gsap.timeline({});
    const handler = () => {
      const htmlElement = document.documentElement;
      const isDark = htmlElement.classList.contains('dark');
      htmlElement.classList[isDark ? 'remove' : 'add']('dark');
      setIsDark(isDark);
    };
    tl.to(containerRef.current, {
      duration: 0,
      opacity: 0,
      onComplete: handler,
    }).to(containerRef.current, {
      duration: 0,
      opacity: 1,
    });
  }

  return (
    <Fragment>
      <button onClick={toggle} className='cursor-pointer'>
        <div ref={containerRef}>{isDark ? <MoonIcon /> : <SunIcon />}</div>
      </button>
    </Fragment>
  );
};
