import MoonIcon from '@/assets/svg/moon.svg';
import SunIcon from '@/assets/svg/sun.svg';

import { useGlobalStore } from '@/store/global-store';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

export const NightMode = () => {
  const toggleDarkMode = useGlobalStore((state) => state.toggleDarkMode);
  const [isDark, setIsDark] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const zzzzzzzzzzzzzzzz = useRef<HTMLDivElement>(null);

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

    // const setScale0 = () => {
    //   gsap.set(zzzzzzzzzzzzzzzz.current, {
    //     scale: 0,
    //   });
    // };

    // tl.to(zzzzzzzzzzzzzzzz.current!, {
    //   scale: 50,
    //   onComplete: setScale0,
    // });

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
    <div className='relative'>
      <button onClick={toggle} className='cursor-pointer'>
        <div ref={containerRef}>{isDark ? <MoonIcon /> : <SunIcon />}</div>
      </button>
      <div
        ref={zzzzzzzzzzzzzzzz}
        // className="absolute right-1/2 bottom-1/2 z-[-1] h-[50px] w-[50px] translate-x-1/2 translate-y-1/2 rounded-[50%] bg-[#6d6d6d] dark:bg-[white]"
        // className="fixed top-[20px] right-[20px] z-[-100] scale-[20] h-[50px] w-[50px] translate-x-1/2 translate-y-1/2 rounded-[50%] bg-[#24d8b4]"
      ></div>
    </div>
  );
};
