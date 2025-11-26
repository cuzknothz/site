import SearchIcon from '@/assets/svg/spotify/search-icon.svg';
import SearchExploreIcon from '@/assets/svg/spotify/search-explore-icon.svg';

export const SearchDivision = () => {
  return (
    <div className='relative flex h-[48px] w-[478px] items-center justify-between rounded-[24px] bg-[#282828] px-[12px]'>
      <div>
        <SearchIcon className='h-[48px] w-[24px] invert' />
      </div>
      <input
        placeholder='What do you want to play? '
        className='absolute top-0 left-0 h-full w-full placeholder:text-[#B1B1B1] py-[12px] pl-[48px] pr-[96px] focus:outline-0 border-[2px] focus:border-[#fff] duration-500 border-transparent rounded-[24px]'
      />
      <div>
        <SearchExploreIcon className='h-[24px] w-[24px] invert' />
      </div>
    </div>
  );
};
