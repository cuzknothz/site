import SpotifyIcon from '../svg/icon.svg';
import HomeIcon from '../svg/home-icon.svg';
import { SearchDivision } from './SearchDivision';

export const Header = () => {
  return (
    <div className='flex h-[64px] w-full items-center justify-between bg-[#000] px-[20px]'>
      <button>
        <SpotifyIcon className='h-[32px]! w-[32px]! invert' />
      </button>

      <div className='flex gap-[8px]'>
        <button className='flex h-[48px]! w-[48px]! items-center justify-center rounded-[50%] bg-[#282828]'>
          <HomeIcon className='h-[24px]! w-[24px]! invert' />
        </button>
        <SearchDivision />
      </div>
      <button className='flex h-[48px] items-center rounded-[24px] bg-[#fff] px-[32px] font-bold text-black!'>
        Log in
      </button>
    </div>
  );
};
