import React, { useState, useRef, useEffect } from 'react';
import { usePlayer } from '@/contexts/PlayerContext';
import styles from './Player.module.scss';
import WavesurferPlayer from '@wavesurfer/react';
import { Input } from '@/components/commons/Input/Input';
import {
  KeyboardIcon,
  LineChartIcon,
  ListMusic,
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
  VolumeIcon,
} from 'lucide-react';
import { Button } from '@/components/commons/Button/Button';
import { buildFullUrl } from '@/utils/buildFullUrl';

const Player = () => {
  const { track, isPlaying, togglePlay } = usePlayer();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const wavesurferRef = useRef<any>(null);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${Math.floor(s % 60)
      .toString()
      .padStart(2, '0')}`;

  const handleReady = (ws: any) => {
    wavesurferRef.current = ws;
    setDuration(ws.getDuration());
    ws.setVolume(volume);
    if (isPlaying) ws.play();
  };

  const handleTimeupdate = (ws: any) => {
    setCurrentTime(ws.getCurrentTime());
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    wavesurferRef.current?.setTime(time);
    setCurrentTime(time);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    wavesurferRef.current?.setVolume(vol);
  };

  useEffect(() => {
    if (!wavesurferRef.current) return;
    const ws = wavesurferRef.current;
    if (isPlaying) ws.play();
    else ws.pause();
  }, [isPlaying]);

  return (
    <footer className={`${styles.player} ${!track ? styles.disabled : ''}`}>
      <div className={styles.songInfo}>
        {track && <img src={buildFullUrl(track?.coverUrl)} alt="Cover" className={styles.image} />}
        <div>
          <p className={styles.title}>{track?.title || 'Nenhuma faixa selecionada'}</p>
          <p className={styles.artist}>{track?.artists.map((a) => a.username).join(', ') || ''}</p>
        </div>
      </div>

      {track && (
        <>
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
            <WavesurferPlayer
              height={60}
              progressColor="#b41414"
              waveColor="#ddd"
              cursorColor="#b41414"
              normalize
              backend="MediaElement"
              url={buildFullUrl(`/track/play/${track.id}`)}
              onReady={handleReady}
              onTimeupdate={handleTimeupdate}
              onFinish={() => togglePlay()}
              onError={(e) => console.error('WaveSurfer error:', e)}
            />
          </div>

          <div className={styles.buttons}>
            <div className={styles.trackInfo}>
              <Button
                variant="ghost"
                onClick={() => {
                  // Aqui você pode chamar uma função como addToPlaylist(track.id)
                  console.log('Adicionar à playlist:', track.id);
                }}
              >
                +
              </Button>
              <Button
                onClick={() => {
                  window.open(`/track/${track.id}/buy`, '_blank');
                }}
              >
                {track.price ? `R$ ${track.price}` : 'Comprar'}
              </Button>

              <div className={styles.infoBox}>
                <span>{`${formatTime(currentTime)} / ${formatTime(duration)}`}</span>

                {track?.bpm && <span>{track.bpm} bpm</span>}

                {track?.key && <span>{track.key}</span>}
              </div>
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
        </>
      )}
    </footer>
  );
};

export default Player;
