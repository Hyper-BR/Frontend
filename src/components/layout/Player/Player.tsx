import { useState, useRef, useEffect } from 'react';
import { usePlayer } from '@/contexts/PlayerContext';
import styles from './Player.module.scss';
import {
  KeyboardIcon,
  ListMusic,
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
  SpaceIcon,
  VolumeIcon,
} from 'lucide-react';
import { Button } from '@/components/commons/Button/Button';
import { buildFullUrl } from '@/utils/buildFullUrl';
import Waveform from '@/components/commons/Waveform/Waveform';
import { formatTime } from '@/utils/formatTime';
import { Dropdown } from '@/components/commons/Dropdown';
import { ScrollingSpan } from '@/components/commons/Span/ScrollingSpan';

const Player = () => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  const wavesurferRef = useRef<any>(null);

  const { currentTrack, isPlaying, togglePlay, next, prev, trackList, setTrackPlayer } = usePlayer();

  const handleReady = (ws: any) => {
    wavesurferRef.current = ws;
    setDuration(ws.getDuration());
    ws.setVolume(volume);
    if (isPlaying) ws.play();
  };

  const handleTimeupdate = (ws: any) => {
    setCurrentTime(ws.getCurrentTime());
  };

  useEffect(() => {
    if (!wavesurferRef.current) return;
    const ws = wavesurferRef.current;
    if (isPlaying) ws.play();
    else ws.pause();
  }, [isPlaying]);

  return (
    <footer className={`${styles.player} ${!currentTrack ? styles.disabled : ''}`}>
      <div className={styles.songInfo}>
        {currentTrack && <img src={buildFullUrl(currentTrack?.coverUrl)} alt="Cover" className={styles.image} />}
        <div>
          <p className={styles.title}>{currentTrack?.title}</p>
          <p className={styles.artist}>{currentTrack?.artists.map((a) => a.username).join(', ') || ''}</p>
        </div>
      </div>

      {currentTrack && (
        <>
          <div className={styles.controls}>
            <Button onClick={prev} disabled={!currentTrack} variant="transparent">
              <SkipBackIcon />
            </Button>

            <Button onClick={togglePlay} disabled={!currentTrack} variant="transparent">
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </Button>

            <Button onClick={next} disabled={!currentTrack} variant="transparent">
              <SkipForwardIcon />
            </Button>
          </div>

          <div className={styles.waveform}>
            <Waveform
              trackId={currentTrack.id}
              height={60}
              onReady={handleReady}
              onTimeupdate={handleTimeupdate}
              onFinish={togglePlay}
            />
          </div>

          <div className={styles.buttons}>
            <div className={styles.infoBox}>
              <span>{`${formatTime(currentTime)} / ${formatTime(duration)}`}</span>

              {currentTrack?.bpm && <span>{currentTrack.bpm} bpm</span>}

              {currentTrack?.key && <span>{currentTrack.key}</span>}
            </div>

            <div className={styles.trackInfo}>
              <Button
                variant="ghost"
                onClick={() => {
                  // Aqui você pode chamar uma função como addToPlaylist(track.id)
                  console.log('Adicionar à playlist:', currentTrack.id);
                }}
              >
                +
              </Button>
              <Button
                onClick={() => {
                  window.open(`/track/${currentTrack.id}/buy`, '_blank');
                }}
              >
                {currentTrack.price ? `R$ ${currentTrack.price}` : 'Comprar'}
              </Button>
            </div>

            <div className={styles.musicControls}>
              <Dropdown.Root key={'keyboard'}>
                <Dropdown.Trigger>
                  <Button variant="ghost" className={styles.keyboard}>
                    <KeyboardIcon />
                  </Button>
                </Dropdown.Trigger>

                <Dropdown.Content size="sm" side="top">
                  <Dropdown.Item rightIcon={<SpaceIcon />}>Play / Pause</Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Root>

              <Dropdown.Root key={'volume'}>
                <Dropdown.Trigger>
                  <Button variant="ghost" className={styles.volume}>
                    <VolumeIcon />
                  </Button>
                </Dropdown.Trigger>

                <Dropdown.Content size="sm" side="top">
                  <Dropdown.Item>Volume</Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Root>

              <Dropdown.Root key={'queue'}>
                <Dropdown.Trigger>
                  <Button variant="ghost" className={styles.inLine}>
                    <ListMusic />
                  </Button>
                </Dropdown.Trigger>

                <Dropdown.Content side="top" size="lg">
                  {trackList.map((track) => (
                    <Dropdown.Item
                      leftImage={track.coverUrl}
                      onClick={() => setTrackPlayer(track)}
                      className={styles.queueItem}
                    >
                      <div className={styles.queueInfo}>
                        <ScrollingSpan align="left" text={track.title} className="scrolling-text" />
                        <span>{track.key}</span>
                        <span>{track.bpm} bpm</span>
                        <span>{formatTime(track.duration)}</span>
                      </div>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Content>
              </Dropdown.Root>
            </div>
          </div>
        </>
      )}
    </footer>
  );
};

export default Player;
