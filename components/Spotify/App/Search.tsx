'use client';
import { useState } from 'react';

export const SearchInput = () => {
  const [kw, setKw] = useState('');

  return (
    <div>
      <input value={kw} onChange={(e) => setKw(e.target.value)} />
    </div>
  );
};
