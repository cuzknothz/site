import { useGlobalStore } from '@/store/global';
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
      <Box className='flex h-10 items-center justify-center px-2.5'>
        Cuộc trò chuyện mới đã được tạo
      </Box>
    </div>
  );
};
