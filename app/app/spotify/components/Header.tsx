import SpotifyIcon from '../svg/icon.svg';
import SpotifyIconDetail from '../svg/spotify-icon.svg';

import HomeIcon from '../svg/home-icon.svg';
import { SearchDivision } from './SearchDivision';
import Link from 'next/link';

export const Header = () => {
  return (
    <div className='flex h-[64px] w-full items-center justify-between bg-[#000] px-[20px]'>
      <button>
        <Link href={'/app/spotify'}>
          <SpotifyIcon className='hidden h-[32px]! w-[32px]! invert lg:block' />
          <SpotifyIconDetail className='fill-[#fff] lg:hidden' />
        </Link>
      </button>

      <div className='hidden gap-[8px] lg:flex'>
        <button className='flex h-[48px]! w-[48px]! items-center justify-center rounded-[50%] bg-[#282828]'>
          <Link href={'/app/spotify'}>
            <HomeIcon className='h-[24px]! w-[24px]! invert' />
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
