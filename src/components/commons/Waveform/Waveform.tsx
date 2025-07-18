import { memo } from 'react';
import WavesurferPlayer from '@wavesurfer/react';
import type WaveSurfer from 'wavesurfer.js';
import { buildFullUrl } from '@/utils/buildFullUrl';

interface WaveformProps {
  trackId: string;
  height?: number;
  progressColor?: string;
  waveColor?: string;
  cursorColor?: string;
  normalize?: boolean;
  onReady?: (ws: WaveSurfer) => void;
  onTimeupdate?: (ws: WaveSurfer) => void;
  onFinish?: () => void;
}

const Waveform = memo(
  ({
    trackId,
    height = 60,
    progressColor = '#b41414',
    waveColor = '#ddd',
    cursorColor = '#b41414',
    normalize = true,
    onReady,
    onTimeupdate,
    onFinish,
  }: WaveformProps) => {
    return (
      <WavesurferPlayer
        height={height}
        url={buildFullUrl(`/track/play/${trackId}`)}
        progressColor={progressColor}
        waveColor={waveColor}
        cursorColor={cursorColor}
        normalize={normalize}
        backend="MediaElement"
        onReady={onReady}
        onTimeupdate={onTimeupdate}
        onFinish={onFinish}
      />
    );
  },
);

export default Waveform;
