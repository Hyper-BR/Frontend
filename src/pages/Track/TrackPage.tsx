import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import WavesurferPlayer from '@wavesurfer/react';
import { getTrackById } from '@/services/track';
import { usePlayer } from '@/contexts/PlayerContext';
import { buildFullUrl } from '@/utils/buildFullUrl';
import { formatTime } from '@/utils/formatTime';
import { Button } from '@/components/commons/Button/Button';
import { PlayIcon, PauseIcon } from 'lucide-react';
import type WaveSurfer from 'wavesurfer.js';
import type { TrackDTO } from '@/services/track/types';
import styles from './TrackPage.module.scss';

export default function TrackPage() {
  const { id } = useParams<{ id: string }>();
  const { currentTrack, isPlaying: globalPlaying, pause: pauseGlobal, volume } = usePlayer();

  const [pageTrack, setPageTrack] = useState<TrackDTO | null>(null);
  const [localWs, setLocalWs] = useState<WaveSurfer | null>(null);
  const [localPlaying, setLocalPlaying] = useState(false);
  const [localTime, setLocalTime] = useState(0);
  const [localDuration, setLocalDuration] = useState(0);

  const isSameTrack = currentTrack?.id === id;

  useEffect(() => {
    if (id) {
      getTrackById(id).then((res) => setPageTrack(res.data));
    }
  }, [id]);

  useEffect(() => {
    if (!localWs) return;
    localWs.setVolume(volume);
  }, [volume, localWs]);

  useEffect(() => {
    if (!localWs) return;
    localPlaying ? localWs.play().catch(console.warn) : localWs.pause();
  }, [localPlaying, localWs]);

  const handleReady = useCallback(
    (ws: WaveSurfer) => {
      setLocalWs(ws);
      ws.setVolume(volume);
      setLocalDuration(ws.getDuration());
    },
    [volume],
  );

  const handleTimeUpdate = useCallback((ws: WaveSurfer) => {
    setLocalTime(ws.getCurrentTime());
  }, []);

  const toggleLocalPlay = () => {
    if (!localWs) return;
    pauseGlobal();
    setLocalPlaying((prev) => !prev);
  };

  if (!pageTrack) return null;

  return (
    <main className={styles.page}>
      <section className={styles.playerWrapper}>
        <div className={styles.coverContainer}>
          <img src={pageTrack.coverUrl} alt={pageTrack.title} className={styles.cover} />
        </div>

        <div className={styles.waveformContainer}>
          <div className={styles.localWaveform}>
            <Button variant="transparent" onClick={toggleLocalPlay}>
              {localPlaying ? <PauseIcon /> : <PlayIcon />}
            </Button>
            <WavesurferPlayer
              height={120}
              url={buildFullUrl(`/track/play/${pageTrack.id}`)}
              progressColor="#b41414"
              waveColor="#ddd"
              cursorColor="#b41414"
              normalize
              backend="MediaElement"
              onReady={handleReady}
              onTimeupdate={handleTimeUpdate}
              onFinish={() => setLocalPlaying(false)}
              onError={(e) => console.error('WaveSurfer error:', e)}
            />
          </div>
        </div>
      </section>

      <section className={styles.info}>
        <h1>{pageTrack.title}</h1>
        <p className={styles.artist}>{pageTrack.artists?.map((a) => a.username).join(', ')}</p>
        <p className={styles.meta}>
          {pageTrack.genre} · {pageTrack.plays}
        </p>

        <div className={styles.time}>{`${formatTime(localTime)} / ${formatTime(localDuration)}`}</div>
      </section>
    </main>
  );
}
