'use client';
import { useHiddenMenuNext } from '@/hooks/useHiddenMenuNext';
import { DiceApp } from './components/DiceApp';

export default function DicePage() {
  useHiddenMenuNext();
  return <DiceApp />;
}
