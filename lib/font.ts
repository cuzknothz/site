import { Cascadia_Mono as AppFont } from 'next/font/google';

export const appFont = AppFont({
  subsets: ['latin', 'vietnamese'],
  adjustFontFallback: false,
  weight: ['400', '700'],
  display: 'swap',
  fallback: ['ui-monospace'],
});