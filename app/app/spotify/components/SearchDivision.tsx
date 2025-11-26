import SearchIcon from '../svg/search-icon.svg';
import SearchExploreIcon from '../svg/search-explore-icon.svg';

export const SearchDivision = () => {
  return (
    <div className='group relative flex h-[48px] w-[478px] items-center justify-between rounded-[24px] bg-[#282828] px-[12px] hover:bg-[#373737] duration-500'>
      <button className='z-1'>
        <SearchIcon className='h-[48px] w-[24px] fill-[#fff]' />
      </button>
      <input
        placeholder='What do you want to play? '
        className='absolute top-0 left-0 h-full w-full rounded-[24px] border-[2px] border-transparent py-[12px] pr-[96px] pl-[48px] text-white! caret-white duration-500 placeholder:text-[#B1B1B1] focus:border-[#fff] focus:outline-0'
      />
      <button>
        <SearchExploreIcon className='h-[24px] w-[24px] invert' />
      </button>
    </div>
  );
};
