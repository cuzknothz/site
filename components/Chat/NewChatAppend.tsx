import { useGlobalStore } from '@/store/global-store';
import { Box } from '../Util/Box';
import clsx from 'clsx';

export const NewChatAppend = () => {
  const showFullMenu = useGlobalStore((s) => s.showFullMenu);

  return (
    <div
      className={clsx(
        'fixed right-1/2 translate-x-1/2 duration-500',
        showFullMenu ? 'bottom-[220px]' : 'bottom-[150px]',
      )}
    >
      <Box className='flex h-[40px] items-center justify-center px-[10px]'>
        Cuộc trò chuyện mới đã được tạo
      </Box>
    </div>
  );
};
