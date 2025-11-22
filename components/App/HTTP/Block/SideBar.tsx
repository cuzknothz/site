import { useEffect, useRef, useState } from 'react';
import { BoxBlock } from '../Common/BoxBlock';
import { useHTTPieStore } from '@/store/app/httpiez';
import clsx from 'clsx';
import { useIsMobile } from '@/hooks/useDeviceType';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MiniRequest } from '../Common/MiniRequest';

export const SideBar = () => {
  const collection = useHTTPieStore((_) => _.collection);
  const selectedRequestId = useHTTPieStore((_) => _.selectedRequestId);
  const setSelectedRequestId = useHTTPieStore((_) => _.setSelectedRequestId);
  const { isMobile } = useIsMobile();
  const sideBarRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(true);

  const { contextSafe } = useGSAP(() => {}, { scope: sideBarRef });

  function toggleSide() {
    setOpen(!open);
  }

  useGSAP(() => {
    let tl = gsap.timeline({});
    gsap.to(sideBarRef.current, {
      width: open ? '250' : '0',
      duration: 0.3,
      padding: 15,
    });
  }, [open]);

  return (
    <>
      <div
        ref={sideBarRef}
        className='z-10 h-full flex-none overflow-hidden p-[15px] sm:h-full sm:bg-[#edede8]'
      >
        <div className='mb-2.5 flex gap-[5px]'>
          <button onClick={toggleSide}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            >
              <path d='M12 3v18' />
              <path d='M3 12h18' />
              <rect x='3' y='3' width='18' height='18' rx='2' />
            </svg>
          </button>

          <p className={clsx('duration-300', !open && '')}>Collection</p>
        </div>
        <div
          className={clsx(
            'flex flex-col gap-[2px] pl-2.5 duration-300',
            !open && '',
          )}
        >
          {collection.map(({ id, name, method }) => (
            <MiniRequest id={id} name={name} method={method} />
          ))}
        </div>
      </div>
    </>
  );
};
