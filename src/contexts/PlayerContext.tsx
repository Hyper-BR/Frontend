import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { TrackDTO } from '@/services/track/types';

export type PlayerContextType = {
  trackList: TrackDTO[];
  currentIndex: number;
  currentTrack: TrackDTO | null;
  isPlaying: boolean;

  setTrackPlayer: (track: TrackDTO) => void;
  setTrackList: (list: TrackDTO[], startIndex?: number) => void;

  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [trackList, setTrackListState] = useState<TrackDTO[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrack = trackList[currentIndex] ?? null;

  const setTrackPlayer = useCallback(
    (track: TrackDTO) => {
      const index = trackList.findIndex((t) => t.id === track.id);
      if (index !== -1) {
        setCurrentIndex(index);
      } else {
        setTrackListState([track]);
        setCurrentIndex(0);
      }
      setIsPlaying(true);
    },
    [trackList],
  );

  const setTrackList = useCallback((list: TrackDTO[], startIndex = 0) => {
    setTrackListState(list);
    const safeIndex = Math.max(0, Math.min(startIndex, list.length - 1));
    setCurrentIndex(safeIndex);
    setIsPlaying(false);
  }, []);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const next = useCallback(() => {
    if (trackList.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % trackList.length);
    setIsPlaying(true);
  }, [trackList.length]);

  const prev = useCallback(() => {
    if (trackList.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + trackList.length) % trackList.length);
    setIsPlaying(true);
  }, [trackList.length]);

  return (
    <PlayerContext.Provider
      value={{
        trackList,
        currentIndex,
        currentTrack,
        isPlaying,
        setTrackPlayer,
        setTrackList,
        play,
        pause,
        togglePlay,
        next,
        prev,
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
