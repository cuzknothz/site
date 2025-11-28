import { Box } from '@/components/Util/Box';
import clsx from 'clsx';
 
interface Props {
  result: number[];
  className?: string;
}
export const Result = ({ result = [], className = '' }: Props) => {
  const sum = result.reduce((total, v) => total + v, 0);
 
  const isChan = sum % 2 == 0;
 
  return (
    <Box
      className={clsx(
        className,
        'flex h-[50px] flex-col items-center rounded-[20px] border-0 text-[#ffffff]',
      )}
    >
      <span className='bg-[#000]'>{result.join(', ')}</span>
      <div className='flex gap-[5px] bg-[#000]'>
        <span>{`Result:`}</span>
        <span className='text-[#00d9ff]'>{`${sum} | ${isChan ? 'Chẵn' : 'Lẻ'}`}</span>
      </div>
    </Box>
  );
};