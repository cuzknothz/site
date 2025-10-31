'use client';

import '@/assets/scss/simple-bar.scss';
import clsx from 'clsx';
import { ReactNode } from 'react';
import SimpleBar from 'simplebar-react';

interface Props {
  className?: string;
  children: ReactNode;
  autoHide?: boolean;
}

export const Scrollbar = ({ className, children, autoHide = true }: Props) => {
  return (
    <SimpleBar className={clsx(className)} autoHide={autoHide}>
      {children}
    </SimpleBar>
  );
};
