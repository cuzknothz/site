
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const FingerFrintCtx = ({ children }: Props) => {
  return (
    <FpjsProvider
      loadOptions={{
        apiKey: 'ecSnEVF03jiHwPcXNbQL',
      }}
    >
      {children}
    </FpjsProvider>
  );
};
