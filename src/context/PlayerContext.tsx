import {
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
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [track, setTrack] = useState<TrackDTO | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const setTrackPlayer = useCallback(
    (newTrack: TrackDTO) => {
      if (track?.id !== newTrack.id) {
        setTrack(newTrack);
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
        setTrackPlayer,
        play,
        pause,
        togglePlay,
      }}
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
