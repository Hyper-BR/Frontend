// src/components/Waveform/Waveform.tsx

import { useEffect, useRef, useCallback } from 'react';
import WavesurferPlayer from '@wavesurfer/react';
import { buildFullUrl } from '@/utils/buildFullUrl';
import type WaveSurfer from 'wavesurfer.js';
import { usePlayer } from '@/contexts/PlayerContext';

interface WaveformProps {
  height?: number;
}

const Waveform = ({ height = 60 }: WaveformProps) => {
  const { currentTrack, isPlaying, next } = usePlayer();
  const wsRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    const ws = wsRef.current;
    if (!ws) return;
    isPlaying ? ws.play().catch(console.warn) : ws.pause();
  }, [isPlaying]);

  const handleReady = useCallback((ws: WaveSurfer) => {
    wsRef.current = ws;
  }, []);

  const handleFinish = useCallback(() => {
    next();
  }, [next]);

  if (!currentTrack) {
    return null;
  }

  return (
    <WavesurferPlayer
      height={height}
      url={buildFullUrl(`/track/play/${currentTrack.id}`)}
      progressColor="#b41414"
      waveColor="#ddd"
      cursorColor="#b41414"
      normalize
      backend="MediaElement"
      onReady={handleReady}
      onFinish={handleFinish}
      onError={(e) => console.error('WaveSurfer error:', e)}
    />
  );
};

export default Waveform;
