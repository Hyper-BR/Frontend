import { useEffect, useRef } from 'react';
import WavesurferPlayer from '@wavesurfer/react';
import { buildFullUrl } from '@/utils/buildFullUrl';
import type WaveSurfer from 'wavesurfer.js';
import { usePlayer } from '@/contexts/PlayerContext';

interface WaveformProps {
  trackId: string;
  isPlaying: boolean;
  onFinish?: () => void;
  height?: number;
}

const Waveform = ({ trackId, isPlaying, onFinish, height = 60 }: WaveformProps) => {
  const { setWaveformRef, setCurrentTime, setDuration, volume } = usePlayer();

  const isSeekingRef = useRef(false);
  const localRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    const ws = localRef.current;
    if (!ws) return;
    isPlaying ? ws.play().catch(console.warn) : ws.pause();
  }, [isPlaying]);

  const handleReady = (ws: WaveSurfer) => {
    localRef.current = ws;
    setWaveformRef(ws);
    setDuration(ws.getDuration());
    ws.setVolume(volume);
  };

  const handleTimeUpdate = (ws: WaveSurfer) => {
    if (!isSeekingRef.current) {
      const time = ws.getCurrentTime();
      isSeekingRef.current = true;
      setCurrentTime(time);
      setTimeout(() => {
        isSeekingRef.current = false;
      }, 50);
    }
  };

  return (
    <WavesurferPlayer
      height={height}
      url={buildFullUrl(`/track/play/${trackId}`)}
      progressColor="#b41414"
      waveColor="#ddd"
      cursorColor="#b41414"
      normalize
      backend="MediaElement"
      onReady={handleReady}
      onTimeupdate={handleTimeUpdate}
      onFinish={onFinish}
      onError={(e) => console.error('WaveSurfer error:', e)}
    />
  );
};

export default Waveform;
