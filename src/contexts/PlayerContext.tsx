import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { TrackDTO } from '@/services/track/types';
import type WaveSurfer from 'wavesurfer.js';

export type PlayerContextType = {
  trackList: TrackDTO[];
  currentIndex: number;
  currentTrack: TrackDTO | null;
  isPlaying: boolean;

  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;

  setTrackList: (tracks: TrackDTO[], startIndex?: number) => void;

  volume: number;
  setVolume: (vol: number) => void;

  waveformRef: WaveSurfer | null;
  setWaveformRef: (ws: WaveSurfer | null) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [trackList, setTrackListState] = useState<TrackDTO[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(1);
  const [waveformRef, setWaveformRefState] = useState<WaveSurfer | null>(null);

  const currentTrack = trackList[currentIndex] ?? null;

  const setTrackList = useCallback((tracks: TrackDTO[], startIndex = 0) => {
    setTrackListState(tracks);
    const idx = Math.max(0, Math.min(startIndex, tracks.length - 1));
    setCurrentIndex(idx);
    setIsPlaying(false);
  }, []);

  const play = useCallback(() => {
    if (waveformRef) {
      waveformRef.play().catch(console.warn);
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

  const next = useCallback(() => {
    setCurrentIndex((prev) => {
      const nextIdx = prev + 1 < trackList.length ? prev + 1 : 0;
      return nextIdx;
    });
    setIsPlaying(true);
  }, [trackList.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => {
      const idx = prev - 1 >= 0 ? prev - 1 : trackList.length - 1;
      return idx;
    });
    setIsPlaying(true);
  }, [trackList.length]);

  const setVolume = useCallback(
    (vol: number) => {
      setVolumeState(vol);
      if (waveformRef) {
        waveformRef.setVolume(vol);
      }
    },
    [waveformRef],
  );

  const setWaveformRef = useCallback(
    (ws: WaveSurfer | null) => {
      setWaveformRefState(ws);
      if (ws) {
        ws.setVolume(volume);
      }
    },
    [volume],
  );

  return (
    <PlayerContext.Provider
      value={{
        trackList,
        currentIndex,
        currentTrack,
        isPlaying,
        play,
        pause,
        togglePlay,
        next,
        prev,
        setTrackList,
        volume,
        setVolume,
        waveformRef,
        setWaveformRef,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextType => {
  const ctx = useContext(PlayerContext);
  if (!ctx) {
    throw new Error('usePlayer must be used within <PlayerProvider>');
  }
  return ctx;
};
