import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from 'react';

type Track = {
  id: number;
  title: string;
  artist: string;
  cover: string;
};

type PlayerContextType = {
  track: Track | null;
  isPlaying: boolean;
  setTrack: (track: Track) => void;
  togglePlay: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [track, setTrack] = useState<Track | null>(null);
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
    if (audioRef.current && track) {
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [track]);

  return (
    <PlayerContext.Provider
      value={{ track, isPlaying, setTrack, togglePlay, audioRef }}
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
