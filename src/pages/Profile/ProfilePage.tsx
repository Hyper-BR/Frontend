import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Card from '@/components/commons/Cards/Card';
import { TrackDTO } from '@/services/track/types';
import { getTracksByArtist } from '@/services/track';
import { addTrackToPlaylist } from '@/services/playlist';
import TrackTable from '@/components/commons/Track/TrackTable';
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const { customer } = useAuth();
  const [tracks, setTracks] = useState<TrackDTO[]>([]);
  const [recommendations, setRecommendations] = useState<TrackDTO[]>([]);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

  const handleAddToPlaylist = async (trackId: string, playlistId: string) => {
    await addTrackToPlaylist(playlistId, trackId);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTracksByArtist();
      setTracks(response.data.content);
    };

    fetchData();
  }, []);

  return (
    <section className={styles.profile}>
      <div className={styles.header}>
        <img
          src={'https://i.pravatar.cc/40?u='}
          alt="avatar"
          className={styles.avatar}
        />
        <div>
          <h2>{customer?.name}</h2>
          <p>{customer?.email}</p>
          <div className={styles.stats}>
            <span>
              <strong>120</strong> seguidores
            </span>
            <span>
              <strong>87</strong> seguindo
            </span>
          </div>
        </div>
      </div>

      <h3>{tracks.length > 0 ? 'Suas faixas' : 'Nada enviado ainda 😢'}</h3>

      {tracks.length > 0 ? (
        <TrackTable
          tracks={tracks}
          selectedTrackId={selectedTrackId}
          setSelectedTrackId={setSelectedTrackId}
          handleAddToPlaylist={handleAddToPlaylist}
        />
      ) : (
        <div className={styles.recommendations}>
          <p>Descubra o que outros artistas estão enviando:</p>
          <div className={styles.tracksGrid}>
            {recommendations.map((track) => (
              <Card
                key={track.id}
                image={'https://i.pravatar.cc/40?u='}
                title={track.title}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfilePage;
