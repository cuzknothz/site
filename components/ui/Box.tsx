import { clsx } from 'clsx';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}
export const Box = ({ children, className = '' }: Props) => {
  return (
    <div
      className={clsx(
        'rounded-[16px] border-[1px] border-[#00000028] dark:border-[#65656563]',
        className,
      )}
    >
      {children}
    </div>
  );
};
