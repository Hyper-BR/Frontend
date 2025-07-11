// src/components/Player/Player.tsx
import React, { useRef, useState, useEffect, useCallback } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { usePlayer } from '@/context/PlayerContext';
import styles from './Player.module.scss';

const Player = () => {
  const { track, isPlaying, togglePlay } = usePlayer();
  const waveRef = useRef<WaveSurfer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  // Inicializa WaveSurfer
  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#ddd',
      progressColor: '#b41414',
      cursorColor: '#b41414',
      height: 60,
      normalize: true,
      backend: 'MediaElement',
    });

    // Eventos
    ws.on('ready', () => {
      setDuration(ws.getDuration());
      ws.setVolume(volume);
      if (isPlaying) ws.play();
    });

    ws.on('audioprocess', () => {
      setCurrentTime(ws.getCurrentTime());
    });

    ws.on('finish', () => {
      togglePlay();
    });

    waveRef.current = ws;

    return () => {
      ws.destroy();
      waveRef.current = null;
    };
  }, [togglePlay, volume, isPlaying]);

  // Carrega nova faixa quando `track` muda
  useEffect(() => {
    const ws = waveRef.current;
    if (ws && track) {
      ws.load(`${process.env.API_URL}/track/play/${track.id}`);
      setCurrentTime(0);
    }
  }, [track]);

  // Sincroniza play/pause
  useEffect(() => {
    const ws = waveRef.current;
    if (!ws) return;
    if (isPlaying) ws.play();
    else ws.pause();
  }, [isPlaying]);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    waveRef.current?.setTime(time);
    setCurrentTime(time);
  }, []);

  const handleVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    waveRef.current?.setVolume(vol);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${sec}`;
  };

  return (
    <footer className={`${styles.player} ${!track ? styles.disabled : ''}`}>
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
          <p className={styles.artist}>
            {track?.artists.map((a) => a.username).join(', ')}
          </p>
        </div>
      </div>

      <div className={styles.controls}>
        <button disabled={!track}>⏮</button>
        <button onClick={togglePlay} disabled={!track}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button disabled={!track}>⏭</button>
      </div>

      <div ref={containerRef} className={styles.waveform} />

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
