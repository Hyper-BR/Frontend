import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type WaveSurfer from 'wavesurfer.js';
import { TrackDTO } from '@/services/track/types';

export type PlayerContextType = {
  track: TrackDTO | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  waveformRef: WaveSurfer | null;
  setTrackPlayer: (track: TrackDTO) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (vol: number) => void;
  setWaveformRef: (ws: WaveSurfer | null) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [track, setTrack] = useState<TrackDTO | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTimeState] = useState(0);
  const [duration, setDurationState] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [waveformRef, setWaveformRefState] = useState<WaveSurfer | null>(null);

  const setTrackPlayer = useCallback((newTrack: TrackDTO) => {
    setTrack(newTrack);
    setCurrentTimeState(0);
    setDurationState(0);
    setWaveformRefState(null);
    setIsPlaying(true);
  }, []);

  const play = useCallback(() => {
    if (waveformRef) {
      waveformRef.play().catch((error) => console.warn('Playback failed:', error));
      setIsPlaying(true);
    }
  }, [waveformRef]);

  const pause = useCallback(() => {
    if (waveformRef) {
      waveformRef.pause();
      setIsPlaying(false);
    }
  }, [waveformRef]);

  const togglePlay = useCallback(() => {
    isPlaying ? pause() : play();
  }, [isPlaying, play, pause]);

  const setCurrentTime = useCallback(
    (time: number) => {
      setCurrentTimeState(time);
      waveformRef?.setTime(time);
    },
    [waveformRef],
  );

  const setDuration = useCallback((dur: number) => {
    setDurationState(dur);
  }, []);

  const setVolume = useCallback(
    (vol: number) => {
      setVolumeState(vol);
      waveformRef?.setVolume(vol);
    },
    [waveformRef],
  );

  const setWaveformRef = useCallback((ws: WaveSurfer | null) => {
    setWaveformRefState(ws);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        track,
        isPlaying,
        currentTime,
        duration,
        volume,
        waveformRef,
        setTrackPlayer,
        play,
        pause,
        togglePlay,
        setCurrentTime,
        setDuration,
        setVolume,
        setWaveformRef,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextType => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer deve estar dentro de <PlayerProvider>');
  return ctx;
};
