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
import Waveform from '@/components/Waveform/Waveform';

export default function TrackPage() {
  const { id } = useParams<{ id: string }>();
  const {
    track: globalTrack,
    currentTime: globalTime,
    duration: globalDuration,
    isPlaying: globalPlaying,
    pause: pauseGlobal,
    volume,
  } = usePlayer();

  const [pageTrack, setPageTrack] = useState<TrackDTO | null>(null);
  const [localWs, setLocalWs] = useState<WaveSurfer | null>(null);
  const [localPlaying, setLocalPlaying] = useState(false);
  const [localTime, setLocalTime] = useState(0);
  const [localDuration, setLocalDuration] = useState(0);

  const isSameTrack = globalTrack?.id === id;

  useEffect(() => {
    if (id) {
      getTrackById(id).then((res) => setPageTrack(res.data));
    }
  }, [id]);

  useEffect(() => {
    if (localWs) {
      localPlaying ? localWs.play() : localWs.pause();
    }
  }, [localPlaying, localWs]);

  useEffect(() => {
    if (localWs) {
      localWs.setVolume(volume);
    }
  }, [volume, localWs]);

  const handleLocalReady = useCallback(
    (ws: WaveSurfer) => {
      setLocalWs(ws);
      ws.setVolume(volume);
      setLocalDuration(ws.getDuration());
    },
    [volume],
  );

  const handleLocalTimeUpdate = useCallback((ws: WaveSurfer) => {
    setLocalTime(ws.getCurrentTime());
  }, []);

  const toggleLocalPlay = () => {
    if (!localWs) return;
    pauseGlobal(); // ✅ Interrompe player global
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
          {isSameTrack ? (
            <Waveform trackId={pageTrack.id} isPlaying={globalPlaying} onFinish={pauseGlobal} height={120} />
          ) : (
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
                onReady={handleLocalReady}
                onTimeupdate={handleLocalTimeUpdate}
                onFinish={() => setLocalPlaying(false)}
                onError={(e) => console.error('WaveSurfer (local) error:', e)}
              />
            </div>
          )}
        </div>
      </section>

      <section className={styles.info}>
        <h1>{pageTrack.title}</h1>
        <p className={styles.artist}>{pageTrack.artists?.map((a) => a.username).join(', ')}</p>
        <p className={styles.meta}>
          {pageTrack.genre} · {pageTrack.plays}
        </p>

        <div className={styles.time}>
          {isSameTrack
            ? `${formatTime(globalTime)} / ${formatTime(globalDuration)}`
            : `${formatTime(localTime)} / ${formatTime(localDuration)}`}
        </div>
      </section>
    </main>
  );
}
