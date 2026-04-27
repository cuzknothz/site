import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const FingerFrintCtx = ({ children }: Props) => {
  return (
    <FpjsProvider
      loadOptions={{
        apiKey: process.env.NEXT_PUBLIC_FPJS_API_KEY || '',
      }}
    >
      {children}
    </FpjsProvider>
  );
};
