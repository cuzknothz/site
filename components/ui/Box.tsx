import { clsx } from 'clsx';
import { MouseEventHandler, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler;
  shadow?: boolean;
}
export const Box = ({
  children,
  className = '',
  onClick = () => {},
  shadow = false,
}: Props) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'rounded-[20px] border border-[#00000030] dark:border-[#65656563]',
        className,
        {
          'shadow shadow-[#00000018]': shadow,
        },
      )}
    >
      {children}
    </div>
  );
};
