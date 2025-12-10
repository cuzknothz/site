'use client';

import Link from 'next/link';
import { useState } from 'react';
import NavYourLibrarySelectedIcon from '../../svg/nav_your_library_selected.svg';
import NavBackIcon from '../../svg/nav_back.svg';
import NavHomeIcon from '../../svg/nav_home.svg';
import NavHomeSelectedIcon from '../../svg/nav_home_selected.svg';
import NavSearchIcon from '../../svg/nav_search.svg';
import NavSearchSelectedIcon from '../../svg/nav_search_selected.svg';
import NavYourLibraryIcon from '../../svg/nav_your-library.svg';
import clsx from 'clsx';

enum Section {
  home,
  search,
  yourLibrary,
  backToApp,
}

export const NavBar = () => {
  const [selected, setSelected] = useState(Section.home);

  const isEqual = (value: Section, valueCompareTo: Section) =>
    value === valueCompareTo;

  const onSelect = (value: Section) => {
    setSelected(value);
  };

  return (
    <div className='fixed bottom-0 left-0 grid h-[90px] w-screen grid-cols-4 bg-linear-to-t from-[#000] to-[#000000ba] pt-[15px] lg:hidden [&__svg]:h-6 [&__svg]:w-6'>
      <button
        className='flex flex-col items-center gap-1'
        onClick={() => onSelect(Section.home)}
      >
        {isEqual(selected, Section.home) ? (
          <NavHomeSelectedIcon className='fill-white!' />
        ) : (
          <NavHomeIcon className='fill-[#b3b3b3]' />
        )}
        <span className='text-[11px]!'>Home</span>
      </button>
      <button
        className='flex flex-col items-center gap-1'
        onClick={() => onSelect(Section.search)}
      >
        {isEqual(selected, Section.search) ? (
          <NavSearchSelectedIcon className='fill-white!' />
        ) : (
          <NavSearchIcon className='fill-[#b3b3b3]' />
        )}
        <span className='text-[11px]!'>Search</span>
      </button>

      <button
        className='flex flex-col items-center gap-1'
        onClick={() => onSelect(Section.yourLibrary)}
      >
        {isEqual(selected, Section.yourLibrary) ? (
          <NavYourLibrarySelectedIcon className='fill-white' />
        ) : (
          <NavYourLibraryIcon className='fill-[#b3b3b3]' />
        )}
        <span className='text-[11px]!'>Your Library</span>
      </button>

      <button
        className='h-full w-full'
        onClick={() => onSelect(Section.backToApp)}
      >
        <Link
          href={'/app'}
          className='flex h-full w-full flex-col items-center gap-1'
        >
          <NavBackIcon
            className={clsx({
              'color-white': isEqual(selected, Section.backToApp),
              'color-[#b3b3b3]': !isEqual(selected, Section.backToApp),
            })}
          />
          <span className='text-[11px]!'>Back To App</span>
        </Link>
      </button>
    </div>
  );
};
