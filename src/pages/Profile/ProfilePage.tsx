import { useEffect, useState } from 'react';
import styles from './ProfilePage.module.scss';
import { useAuth } from '@/hooks/useAuth';
import Card from '@/components/commons/Cards/Card';
import { TrackDTO } from '@/services/track/types';

const ProfilePage = () => {
  const { customer } = useAuth();
  const [tracks, setTracks] = useState<TrackDTO[]>([]);
  const [recommendations, setRecommendations] = useState<TrackDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      //   const userTracks = await getMyTracks(); // 🔁 tracks do usuário logado
      //   setTracks(userTracks);
      //   if (userTracks.length === 0) {
      //     const recs = await getRecommendations(); // 🧠 sugestões se sem tracks
      //     setRecommendations(recs);
      //   }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.profile}>
      <div className={styles.header}>
        <img src={customer?.avatarUrl} alt="avatar" className={styles.avatar} />
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

      <div className={styles.section}>
        <h3>{tracks.length > 0 ? 'Suas faixas' : 'Nada enviado ainda 😢'}</h3>

        {tracks.length > 0 ? (
          <div className={styles.tracksGrid}>
            {tracks.map((track) => (
              <Card
                key={track.id}
                image={'https://i.pravatar.cc/40?u='}
                title={track.title}
              />
            ))}
          </div>
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
      </div>
    </section>
  );
};

export default ProfilePage;
