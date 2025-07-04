import React, { useState, useEffect } from 'react';
import styles from './Player.module.scss';
import { usePlayer } from '../../../../src/context/PlayerContext';

const Player = () => {
  const { track, isPlaying, togglePlay, audioRef } = usePlayer();

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  console.log('PLAYERRR');

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => setCurrentTime(audio.currentTime);
    const meta = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', update);
    audio.addEventListener('loadedmetadata', meta);
    return () => {
      audio.removeEventListener('timeupdate', update);
      audio.removeEventListener('loadedmetadata', meta);
    };
  }, [audioRef, track]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(e.target.value);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const format = (s: number) =>
    `${Math.floor(s / 60)}:${Math.floor(s % 60)
      .toString()
      .padStart(2, '0')}`;

  return (
    <footer className={`${styles.player} ${!track ? styles.disabled : ''}`}>
      <audio
        ref={audioRef}
        src={
          track
            ? `${process.env.API_URL}/track/download/${track.id}`
            : undefined
        }
        preload="metadata"
      />

      <div className={styles.songInfo}>
        <img
          src={'https://i.pravatar.cc/50?u='}
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
        <button onClick={togglePlay} disabled={!track}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button disabled={!track}>⏭</button>

        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          disabled={!track}
          className={styles.progress}
        />
        <span className={styles.timer}>
          {track
            ? `${format(currentTime)} / ${format(duration)}`
            : '--:-- / --:--'}
        </span>
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
