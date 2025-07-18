import { useEffect } from 'react';
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
  const { track, setCurrentTime, setDuration, volume, play, pause } = usePlayer();

  const isSameTrack = track?.id === trackId;

  useEffect(() => {
    if (!isSameTrack) return;
    isPlaying ? play() : pause();
  }, [isSameTrack, isPlaying, play, pause]);

  const handleReady = (ws: WaveSurfer) => {
    if (isSameTrack) {
      setDuration(ws.getDuration());
      ws.setVolume(volume);
    }
  };

  const handleTimeUpdate = (ws: WaveSurfer) => {
    if (isSameTrack) {
      setCurrentTime(ws.getCurrentTime());
    }
  };

  return (
    <WavesurferPlayer
      height={height}
      progressColor="#b41414"
      waveColor="#ddd"
      cursorColor="#b41414"
      normalize
      backend="MediaElement"
      url={buildFullUrl(`/track/play/${trackId}`)}
      onReady={handleReady}
      onTimeupdate={handleTimeUpdate}
      onFinish={onFinish}
      onError={(e) => console.error('WaveSurfer error:', e)}
    />
  );
};

export default Waveform;
