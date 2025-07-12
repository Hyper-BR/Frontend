import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import styles from './TrackPage.module.scss';
import { getTrackById } from '@/services/track';
import WavesurferPlayer from '@wavesurfer/react';
import { usePlayer } from '@/contexts/PlayerContext';
import { TrackDTO } from '@/services/track/types';

export default function TrackPage() {
  const { id } = useParams();
  const { isPlaying, togglePlay } = usePlayer();
  const [track, setTrack] = useState<TrackDTO | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const wavesurferRef = useRef<any>(null);

  useEffect(() => {
    const fetchTrack = async () => {
      const response = await getTrackById(id!);
      setTrack(response.data);
    };
    fetchTrack();
  }, [id]);

  const handleReady = (ws: any) => {
    wavesurferRef.current = ws;
    setDuration(ws.getDuration());
    ws.setVolume(volume);
    if (isPlaying) ws.play();
  };

  const handleTimeupdate = (ws: any) => {
    setCurrentTime(ws.getCurrentTime());
  };

  if (!track) return <p className={styles.loading}>Carregando faixa...</p>;

  return (
    <main className={styles.page}>
      <section className={styles.playerWrapper}>
        <div className={styles.coverContainer}>
          <img
            src={'https://i.pravatar.cc/1579?u='}
            alt={track.title}
            className={styles.cover}
          />
        </div>
        <div className={styles.waveformContainer}>
          <WavesurferPlayer
            height={120}
            progressColor="#fff"
            waveColor="#555"
            cursorColor="#e8202a"
            normalize
            backend="MediaElement"
            url={`${process.env.API_URL}/track/play/${track.id}`}
            onReady={handleReady}
            onTimeupdate={handleTimeupdate}
            onFinish={() => togglePlay()}
            onError={(e) => console.error('WaveSurfer error:', e)}
          />
        </div>
      </section>

      <section className={styles.info}>
        <h1>{track.title}</h1>
        <p className={styles.artist}>
          {track.artists?.map((a) => a.username).join(', ')}
        </p>
        <p className={styles.meta}>{track.genre} · 200 reproduções</p>
      </section>
    </main>
  );
}
