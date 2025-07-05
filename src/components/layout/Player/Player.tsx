import { useEffect, useRef, useState } from 'react';
import styles from './Player.module.scss';
import { usePlayer } from '@/context/PlayerContext';
import WaveSurferPlayer from '@wavesurfer/react';

const Player = () => {
  const { track, isPlaying, togglePlay } = usePlayer();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  const wavesurferRef = useRef<any>(null);

  const handleReady = (ws: any) => {
    wavesurferRef.current = ws;
    setDuration(ws.getDuration());
    ws.setVolume(volume);
    if (isPlaying) ws.play();
  };

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
      togglePlay();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (wavesurferRef.current) {
      wavesurferRef.current.setTime(time);
      setCurrentTime(time);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(vol);
    }
  };

  const format = (s: number) =>
    `${Math.floor(s / 60)}:${Math.floor(s % 60)
      .toString()
      .padStart(2, '0')}`;

  return (
    <footer className={`${styles.player} ${!track ? styles.disabled : ''}`}>
      <div className={styles.songInfo}>
        <img
          src={track?.coverUrl || 'https://i.pravatar.cc/50?u='}
          alt="Cover"
          className={styles.image}
        />
        <div>
          <p className={styles.title}>
            {track?.title || 'Nenhuma faixa selecionada'}
          </p>
          <p className={styles.artist}>{track?.artists || ''}</p>
        </div>
      </div>

      <div className={styles.controls}>
        <button disabled={!track}>⏮</button>
        <button onClick={handlePlayPause} disabled={!track}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button disabled={!track}>⏭</button>
      </div>

      <div className={styles.waveform}>
        {track && (
          <WaveSurferPlayer
            height={60}
            progressColor="#b41414"
            normalize={true}
            url={`${process.env.API_URL}/track/play/${track.id}`}
            onReady={handleReady}
            onTimeupdate={(ws: any) => setCurrentTime(ws.getCurrentTime())}
            onError={(e) => console.error('WaveSurfer error:', e)}
          />
        )}
      </div>

      <div className={styles.volume}>
        🔊
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolume}
          disabled={!track}
        />
      </div>
    </footer>
  );
};

export default Player;
