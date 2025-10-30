import { SpectrogramPlayer } from '@/components/Spek/Spek';
import { UnderDevelopment } from '@/components/Util/UnderDevelopmentPage';

export default function Spectrogram() {
  return (
    <div>
      <SpectrogramPlayer audioUrl='/loopazon-1761754079-emotions-synth-rnb-loop-the-weeknd-type.mp3' />
    </div>
  );
}
