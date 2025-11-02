'use client';
import { Box } from '@/components/Util/Box';
import clsx from 'clsx';

interface AvatarProps {
  className: string;
}
export const Avatar = ({ className }: AvatarProps) => {
  return (
    <Box className={clsx('aspect-square w-[40px] rounded-[50%]', className)}>
      {''}
    </Box>
  );
};
