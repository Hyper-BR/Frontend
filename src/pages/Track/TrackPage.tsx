import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './TrackPage.module.scss';
import { getTrackById } from '@/services/track';
import { usePlayer } from '@/contexts/PlayerContext';
import Waveform from '@/components/Waveform/Waveform';
import { formatTime } from '@/utils/formatTime';
import type { TrackDTO } from '@/services/track/types';

export default function TrackPage() {
  const { id } = useParams();
  const { track, currentTime, duration, isPlaying, togglePlay, setCurrentTime, setDuration } = usePlayer();

  const [pageTrack, setPageTrack] = useState<TrackDTO | null>(null);

  const isSameTrack = track?.id === id;

  useEffect(() => {
    if (id) {
      getTrackById(id).then((res) => setPageTrack(res.data));
    }
  }, [id]);

  if (!pageTrack) return null;

  return (
    <main className={styles.page}>
      <section className={styles.playerWrapper}>
        <div className={styles.coverContainer}>
          <img src={pageTrack.coverUrl} alt={pageTrack.title} className={styles.cover} />
        </div>
        <div className={styles.waveformContainer}>
          <Waveform height={120} trackId={pageTrack.id} isPlaying={isSameTrack && isPlaying} onFinish={togglePlay} />
        </div>
      </section>

      <section className={styles.info}>
        <h1>{pageTrack.title}</h1>
        <p className={styles.artist}>{pageTrack.artists?.map((artist) => artist.username).join(', ')}</p>
        <p className={styles.meta}>{pageTrack.genre} · 200 reproduções</p>

        {isSameTrack && (
          <div className={styles.time}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        )}
      </section>
    </main>
  );
}
