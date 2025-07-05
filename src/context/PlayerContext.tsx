import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from 'react';
import { TrackDTO } from '@/services/track/types';

type PlayerContextType = {
  track: TrackDTO | null;
  isPlaying: boolean;
  setTrackPlayer: (track: TrackDTO) => void;
  togglePlay: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [trackPlayer, setTrackPlayer] = useState<TrackDTO | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioRef.current && trackPlayer) {
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [trackPlayer]);

  return (
    <PlayerContext.Provider
      value={{
        track: trackPlayer,
        isPlaying,
        setTrackPlayer,
        togglePlay,
        audioRef,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context)
    throw new Error('usePlayer deve estar dentro de PlayerProvider');
  return context;
};
