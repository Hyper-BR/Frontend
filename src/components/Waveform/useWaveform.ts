import { useState, useRef, useCallback } from 'react';
import type WaveSurfer from 'wavesurfer.js';

export const useWaveform = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isReady, setIsReady] = useState(false);

  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const setPlayerRef = useCallback(
    (ws: WaveSurfer) => {
      wavesurferRef.current = ws;
      const dur = ws.getDuration();
      setDuration(dur);
      ws.setVolume(volume);
      setIsReady(true);
    },
    [volume],
  );

  const play = () => {
    if (!wavesurferRef.current || !isReady) return;
    wavesurferRef.current.play();
  };

  const pause = () => {
    if (!wavesurferRef.current || !isReady) return;
    wavesurferRef.current.pause();
  };

  const seek = (time: number) => {
    if (!wavesurferRef.current || !isReady) return;
    wavesurferRef.current.setTime(time);
    setCurrentTime(time);
  };

  const updateTime = (time: number) => {
    setCurrentTime(time);
  };

  return {
    currentTime,
    duration,
    volume,
    isReady,
    setVolume,
    setPlayerRef,
    play,
    pause,
    seek,
    updateTime,
  };
};
