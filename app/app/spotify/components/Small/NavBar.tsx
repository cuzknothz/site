import NavHomeIcon from '../../svg/nav_home.svg';
import NavSearchIcon from '../../svg/nav_search.svg';
import NavYourLibraryIcon from '../../svg/nav_your-library.svg';
import NavBackIcon from '../../svg/nav_back.svg';
import Link from 'next/link';

export const NavBar = () => {
  return (
    <div className='fixed bottom-0 left-0 grid h-[85px] w-screen grid-cols-4 bg-[black] pt-[15px] sm:hidden [&__svg]:h-6 [&__svg]:w-6'>
      <div className='flex flex-col items-center gap-1'>
        <NavHomeIcon className='fill-[#b3b3b3]' />
        <span className='text-[11px]!'>Home</span>
      </div>
      <div className='flex flex-col items-center gap-1'>
        <NavSearchIcon className='fill-[#b3b3b3]' />
        <span className='text-[11px]!'>Search</span>
      </div>

      <div className='flex flex-col items-center gap-1'>
        <NavYourLibraryIcon className='fill-[#b3b3b3]' />
        <span className='text-[11px]!'>Your Library</span>
      </div>

      <div className='h-full w-full'>
        <Link
          href={'/app'}
          className='flex h-full w-full flex-col items-center gap-1'
        >
          <NavBackIcon className='' />
          <span className='text-[11px]!'>Back To App</span>
        </Link>
      </div>
    </div>
  );
};
