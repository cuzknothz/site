import LibPlusIcon from '@/assets/svg/spotify/library-plus-icon.svg';
export const SideBar = () => {
  return (
    <div className='h-full w-[420px] rounded-[20px] bg-[#121212] overflow-hidden flex-none'>
      <div className='flex justify-between px-[16px] pt-[16px] pb-[8px]'>
        <h1 className='font-bold text-white!'>Your library</h1>
        <button className='flex h-[35px] w-[35px] items-center justify-center rounded-[50%] duration-300 hover:bg-[#383838]'>
          <LibPlusIcon className='h-[16px] w-[16px] invert' />
        </button>
      </div>

      <div className='flex flex-col gap-[8px] px-[8px]'>
        <div className='my-[8px] w-full rounded-[8px] bg-[#202020] px-[20px] py-[16px]'>
          <span className='block font-bold text-white!'>
            Create your first playlist
          </span>
          <span className='mt-[8px] block text-[14px]! text-white!'>
            It's easy, we'll help you
          </span>
          <button className='mt-[16px] rounded-s-[999px] rounded-e-[999px] bg-white px-[16px] py-[4px] text-[14px]! font-bold text-black!'>
            Create playlist
          </button>
        </div>

        <div className='my-[8px] w-full rounded-[8px] bg-[#202020] px-[20px] py-[16px]'>
          <span className='block font-bold text-white!'>
            Let's find some podcasts to follow
          </span>
          <span className='mt-[8px] block text-[14px]! text-white!'>
            We'll keep you updated on new episodes
          </span>
          <button className='mt-[16px] rounded-s-[999px] rounded-e-[999px] bg-white px-[16px] py-[4px] text-[14px]! font-bold text-black!'>
            Browse podcasts
          </button>
        </div>
      </div>
    </div>
  );
};
