import clsx from 'clsx';
import { forwardRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}
export const BoxBlock = forwardRef<HTMLDivElement, Props>(
  ({ children, className = '', onClick }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={clsx(
          'flex h-[30px] cursor-pointer items-center justify-center gap-[5px] rounded-lg px-2.5',
          className,
        )}
      >
        {children}
      </div>
    );
  },
);
