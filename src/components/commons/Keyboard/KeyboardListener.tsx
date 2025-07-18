// src/components/KeyboardListener.tsx
import { useEffect } from 'react';
import { usePlayer } from '@/contexts/PlayerContext';

const KeyboardListener = (): any => {
  const { togglePlay, currentTrack } = usePlayer();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInputFocused = document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);

      if (isInputFocused) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (currentTrack) togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, currentTrack]);

  return null;
};

export default KeyboardListener;
