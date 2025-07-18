import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { TrackDTO } from '@/services/track/types';

export type PlayerContextType = {
  track: TrackDTO | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  setTrackPlayer: (track: TrackDTO) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (vol: number) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [track, setTrack] = useState<TrackDTO | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const setTrackPlayer = useCallback(
    (newTrack: TrackDTO) => {
      if (track?.id !== newTrack.id) {
        setTrack(newTrack);
        setCurrentTime(0); // reseta tempo para nova faixa
        setDuration(0); // reseta duração
      }
      setIsPlaying(true);
    },
    [track],
  );

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        track,
        isPlaying,
        currentTime,
        duration,
        volume,
        setTrackPlayer,
        play,
        pause,
        togglePlay,
        setCurrentTime,
        setDuration,
        setVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextType => {
  const ctx = useContext(PlayerContext);
  if (!ctx) {
    throw new Error('usePlayer deve estar dentro de <PlayerProvider>');
  }
  return ctx;
};
