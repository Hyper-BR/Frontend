import { useEffect, useRef } from 'react';
import { usePlayer } from '@/contexts/PlayerContext';
import styles from './Player.module.scss';
import { KeyboardIcon, ListMusic, PauseIcon, PlayIcon, SkipBackIcon, SkipForwardIcon, VolumeIcon } from 'lucide-react';
import { Button } from '@/components/commons/Button/Button';
import { buildFullUrl } from '@/utils/buildFullUrl';
import Waveform from '@/components/Waveform/Waveform';
import { formatTime } from '@/utils/formatTime';

const Player = () => {
  const { track, isPlaying, togglePlay, currentTime, duration, volume, setCurrentTime, setDuration, setVolume } =
    usePlayer();

  const wavesurferRef = useRef<any>(null);

  useEffect(() => {
    if (!wavesurferRef.current) return;
    const ws = wavesurferRef.current;
    isPlaying ? ws.play() : ws.pause();
  }, [isPlaying]);

  if (!track) return null;

  return (
    <footer className={`${styles.player} ${!track ? styles.disabled : ''}`}>
      <div className={styles.songInfo}>
        <img src={buildFullUrl(track.coverUrl)} alt="Cover" className={styles.image} />
        <div>
          <p className={styles.title}>{track.title}</p>
          <p className={styles.artist}>{track.artists.map((a) => a.username).join(', ')}</p>
        </div>
      </div>

      <div className={styles.controls}>
        <Button disabled={!track} variant="transparent">
          <SkipBackIcon />
        </Button>
        <Button onClick={togglePlay} disabled={!track} variant="transparent">
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </Button>
        <Button disabled={!track} variant="transparent">
          <SkipForwardIcon />
        </Button>
      </div>

      <div className={styles.waveform}>
        <Waveform trackId={track.id} isPlaying={isPlaying} onFinish={togglePlay} height={60} />
      </div>

      <div className={styles.buttons}>
        <div className={styles.infoBox}>
          <span>{`${formatTime(currentTime)} / ${formatTime(duration)}`}</span>
          {track.bpm && <span>{track.bpm} bpm</span>}
          {track.key && <span>{track.key}</span>}
        </div>

        <div className={styles.trackInfo}>
          <Button variant="ghost" onClick={() => console.log('Adicionar à playlist:', track.id)}>
            +
          </Button>
          <Button onClick={() => window.open(`/track/${track.id}/buy`, '_blank')}>
            {track.price ? `R$ ${track.price}` : 'Comprar'}
          </Button>
        </div>

        <div className={styles.musicControls}>
          <Button variant="ghost" className={styles.keyboard}>
            <KeyboardIcon />
          </Button>

          <Button variant="ghost" className={styles.volume}>
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
