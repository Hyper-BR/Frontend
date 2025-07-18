import { useEffect } from 'react';
import { usePlayer } from '@/contexts/PlayerContext';
import styles from './Player.module.scss';
import { KeyboardIcon, ListMusic, PauseIcon, PlayIcon, SkipBackIcon, SkipForwardIcon, VolumeIcon } from 'lucide-react';
import { Button } from '@/components/commons/Button/Button';
import { buildFullUrl } from '@/utils/buildFullUrl';
import Waveform from '@/components/Waveform/Waveform';
import { formatTime } from '@/utils/formatTime';

const Player = () => {
  const { currentTrack, isPlaying, togglePlay, prev, next, volume, setVolume } = usePlayer();

  if (!currentTrack) return null;

  return (
    <footer className={`${styles.player} ${!currentTrack ? styles.disabled : ''}`}>
      <div className={styles.songInfo}>
        <img src={buildFullUrl(currentTrack.coverUrl)} alt="Cover" className={styles.image} />
        <div>
          <p className={styles.title}>{currentTrack.title}</p>
          <p className={styles.artist}>{currentTrack.artists.map((a) => a.username).join(', ')}</p>
        </div>
      </div>

      <div className={styles.controls}>
        <Button onClick={prev} variant="transparent">
          <SkipBackIcon />
        </Button>
        <Button onClick={togglePlay} variant="transparent">
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </Button>
        <Button onClick={next} variant="transparent">
          <SkipForwardIcon />
        </Button>
      </div>

      <div className={styles.waveform}>
        <Waveform height={60} />
      </div>

      <div className={styles.buttons}>
        <div className={styles.infoBox}>
          <span>
            {formatTime(0)} / {formatTime(0)}
          </span>
          {currentTrack.bpm && <span>{currentTrack.bpm} bpm</span>}
          {currentTrack.key && <span>{currentTrack.key}</span>}
        </div>

        <div className={styles.trackInfo}>
          <Button variant="ghost" onClick={() => console.log('Adicionar à playlist:', currentTrack.id)}>
            +
          </Button>
          <Button onClick={() => window.open(`/track/${currentTrack.id}/buy`, '_blank')}>
            {currentTrack.price ? `R$ ${currentTrack.price}` : 'Comprar'}
          </Button>
        </div>

        <div className={styles.musicControls}>
          <Button variant="ghost" className={styles.keyboard}>
            <KeyboardIcon />
          </Button>
          <Button variant="ghost" className={styles.volume} onClick={() => setVolume(volume > 0.5 ? 0 : 1)}>
            <VolumeIcon />
          </Button>
          <Button variant="ghost" className={styles.inLine}>
            <ListMusic />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Player;
