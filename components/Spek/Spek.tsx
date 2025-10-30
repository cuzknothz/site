'use client';

import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
// Plugin spectrogram của v7:
import Spectrogram from 'wavesurfer.js/dist/plugins/spectrogram.esm.js';

type Props = {
  audioUrl: string; // ví dụ: '/audio/sample.mp3'
};

export const SpectrogramPlayer = ({ audioUrl }: Props) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const spectroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!waveformRef.current || !spectroRef.current) return;

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      url: audioUrl,
      height: 0,

      plugins: [
        Spectrogram.create({
          container: spectroRef.current,
          height: 300,
          labels: true, // hiện tần số ở trục Y
          fftSamples: 1024, // 512/1024/2048...
          frequencyMax: 24000,
          splitChannels: false,
        }),
      ],
    });

    return () => ws.destroy();
  }, [audioUrl]);

  return (
    <div className='space-y-2'>
      <div ref={waveformRef} />
      <div ref={spectroRef} />
    </div>
  );
};
