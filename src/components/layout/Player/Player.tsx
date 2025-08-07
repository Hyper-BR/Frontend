import { useState, useRef, useEffect } from 'react';
import { usePlayer } from '@/contexts/PlayerContext';
import styles from './Player.module.scss';
import {
  Check,
  KeyboardIcon,
  ListMusic,
  PauseIcon,
  PlayIcon,
  Plus,
  SkipBackIcon,
  SkipForwardIcon,
  SpaceIcon,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Button } from '@/components/commons/Button/Button';
import { buildFullUrl } from '@/utils/buildFullUrl';
import Waveform from '@/components/commons/Waveform/Waveform';
import { formatSecondsTime } from '@/utils/formatTime';
import { Dropdown } from '@/components/commons/Dropdown';
import { ScrollingSpan } from '@/components/commons/Span/ScrollingSpan';
import { Slider } from '@/components/commons/Slider/Slider';
import { TrackLink } from '@/components/commons/Link/TrackLink';
import { ArtistLinkGroup } from '@/components/commons/Link/ArtistLinkGroup';
import { PlaylistDTO } from '@/services/playlist/types';
import { addTrackToPlaylist, getPlaylistsCustomer, removeTrackFromPlaylist } from '@/services/playlist';
import { useAuth } from '@/hooks/useAuth';

const Player = () => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playlists, setPlaylists] = useState<PlaylistDTO[]>([]);

  const wavesurferRef = useRef<any>(null);

  const { currentTrack, isPlaying, togglePlay, next, prev, trackList, setTrackPlayer } = usePlayer();
  const { customer } = useAuth();

  const handleReady = (ws: any) => {
    wavesurferRef.current = ws;
    setDuration(ws.getDuration());
    ws.setVolume(volume);
    if (isPlaying) ws.play();
  };

  const handleTimeupdate = (ws: any) => {
    setCurrentTime(ws.getCurrentTime());
  };

  function getVolumeIcon(volume: number) {
    if (volume === 0) return <VolumeX />;
    if (volume < 0.3) return <Volume />;
    if (volume < 0.7) return <Volume1 />;
    return <Volume2 />;
  }

  useEffect(() => {
    if (!wavesurferRef.current) return;
    const ws = wavesurferRef.current;
    if (isPlaying) ws.play();
    else ws.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(Math.min(volume, 1));
    }
  }, [volume]);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const resp = await getPlaylistsCustomer();
        setPlaylists(resp.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPlaylists();
  }, []);

  const toggleInPlaylist = async (trackId: string, playlist: PlaylistDTO, isMember: boolean) => {
    if (isMember) {
      await removeTrackFromPlaylist(playlist.id, trackId);
      setPlaylists((prev) =>
        prev.map((pl) => (pl.id === playlist.id ? { ...pl, tracks: pl.tracks.filter((t) => t.id !== trackId) } : pl)),
      );
    } else {
      await addTrackToPlaylist(playlist.id, trackId);
      setPlaylists((prev) =>
        prev.map((pl) => (pl.id === playlist.id ? { ...pl, tracks: [...pl.tracks, { id: trackId } as any] } : pl)),
      );
    }
  };

  return (
    <footer className={`${styles.player} ${!currentTrack ? styles.disabled : ''}`}>
      <div className={styles.songInfo}>
        {currentTrack && <img src={buildFullUrl(currentTrack?.coverUrl)} alt="Cover" className={styles.image} />}
        <div>
          <div>
            <TrackLink track={currentTrack} size="lg" />
          </div>
          <div>
            <ArtistLinkGroup artists={currentTrack?.artists} size="sm" color="muted" />
          </div>
        </div>
      </div>

      {currentTrack && (
        <>
          <div className={styles.controls}>
            <Button onClick={prev} disabled={!currentTrack} variant="muted">
              <SkipBackIcon />
            </Button>

            <Button onClick={togglePlay} disabled={!currentTrack} variant="muted">
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </Button>

            <Button onClick={next} disabled={!currentTrack} variant="muted">
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
              <span>{`${formatSecondsTime(currentTime)} / ${formatSecondsTime(duration)}`}</span>

              {currentTrack?.bpm && <span>{currentTrack.bpm} bpm</span>}

              {currentTrack?.key && <span>{currentTrack.key}</span>}
            </div>

            {customer?.artist && (
              <>
                <div className={styles.trackInfo}>
                  <Dropdown.Root key={'playlists'}>
                    <Dropdown.Trigger>
                      <Button variant="ghost">+</Button>
                    </Dropdown.Trigger>

                    <Dropdown.Content size="md" side="top">
                      {playlists.map((playlist) => {
                        const isMember = playlist.tracks.some((track) => track.id === currentTrack.id);
                        return (
                          <Dropdown.Item
                            key={playlist.id}
                            onClick={() => toggleInPlaylist(currentTrack.id, playlist, isMember)}
                            rightIcon={isMember ? <Check size={12} /> : <Plus size={12} />}
                            className={styles.playlistItem}
                          >
                            <ScrollingSpan text={playlist.name} />
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Content>
                  </Dropdown.Root>
                  <Button
                    onClick={() => {
                      window.open(`/track/${currentTrack.id}/buy`, '_blank');
                    }}
                  >
                    R$ {currentTrack.price}
                  </Button>
                </div>
              </>
            )}

            <div>
              <Dropdown.Root key={'keyboard'}>
                <Dropdown.Trigger>
                  <Button variant="ghost" className={styles.keyboard}>
                    <KeyboardIcon />
                  </Button>
                </Dropdown.Trigger>

                <Dropdown.Content size="sm" side="top">
                  <Dropdown.Item onClick={togglePlay} rightIcon={<SpaceIcon />}>
                    Play / Pause
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Root>

              <Dropdown.Root key={'volume'}>
                <Dropdown.Trigger>
                  <Button variant="ghost">{getVolumeIcon(volume)}</Button>
                </Dropdown.Trigger>

                <Dropdown.Content size="xs" side="top">
                  <Slider value={volume * 100} onChange={(val) => setVolume(val / 100)} vertical />
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
                      key={track.id}
                      leftImage={track.coverUrl}
                      onClick={() => setTrackPlayer(track)}
                      className={styles.queueItem}
                    >
                      <div className={styles.queueInfo}>
                        <ScrollingSpan align="left" text={track.title} className="scrolling-text" />
                        <span>{track.key}</span>
                        <span>{track.bpm} bpm</span>
                        <span>{formatSecondsTime(track.duration)}</span>
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
