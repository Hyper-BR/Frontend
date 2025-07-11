// src/contexts/PlayerContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { TrackDTO } from '@/services/track/types';

export type PlayerContextType = {
  track: TrackDTO | null;
  isPlaying: boolean;
  setTrackPlayer: (track: TrackDTO) => void;
  togglePlay: () => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [track, setTrack] = useState<TrackDTO | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Seleciona nova faixa e dispara play
  const setTrackPlayer = useCallback(
    (newTrack: TrackDTO) => {
      if (track?.id === newTrack.id) {
        // já é a mesma faixa, só garante play
        setIsPlaying(true);
      } else {
        setTrack(newTrack);
        setIsPlaying(true);
      }
    },
    [track],
  );

  // Alterna entre play e pause
  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  return (
    <PlayerContext.Provider
      value={{ track, isPlaying, setTrackPlayer, togglePlay }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) {
    throw new Error('usePlayer deve estar dentro de <PlayerProvider>');
  }
  return ctx;
};
