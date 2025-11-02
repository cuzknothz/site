'use client';

import { Code } from '../Util/Code';
import { TextScramble } from '../Util/TextScramble';

export const ArticleDetail = () => {
  const code = `
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
  `;

  return (
    <div>
      <TextScramble bold text={'Note > ' + ''} className='mb-2.5' />
      <Code code={code} />
    </div>
  );
};
