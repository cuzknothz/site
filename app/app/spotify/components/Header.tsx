import SpotifyIcon from '../svg/icon.svg';
import SpotifyIconDetail from '../svg/spotify-icon.svg';

import HomeIcon from '../svg/home-icon.svg';
import { SearchDivision } from './SearchDivision';
import Link from 'next/link';

export const Header = () => {
  return (
    <div className='fixed z-0 z-10 flex h-16 w-full items-center justify-between bg-linear-to-b from-black to-[#00000037] px-5'>
      <button>
        <Link href={'/app/spotify'}>
          <SpotifyIcon className='invert lg:h-[38px]!' />
        </Link>
      </button>

      <div className='hidden gap-2 lg:flex'>
        <button className='flex h-12! w-12! items-center justify-center rounded-[50%] bg-[#282828]'>
          <Link href={'/app/spotify'}>
            <HomeIcon className='h-6! w-6! invert' />
          </Link>
        </button>
        <SearchDivision />
      </div>
      <button className='flex h-[40px] items-center rounded-[24px] bg-[#fff] px-[20px] font-bold text-black! lg:h-[48px] lg:px-[32px] lg:text-[14px]!'>
        Log in
      </button>
    </div>
  );
};
