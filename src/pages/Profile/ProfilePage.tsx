import { useEffect, useState } from 'react';
import styles from './ProfilePage.module.scss';
import { useAuth } from '@/hooks/useAuth';
import Card from '@/components/commons/Cards/Card';
import { TrackDTO } from '@/services/track/types';
import { getTracksByArtist } from '@/services/track';
import { Table } from '@/components/commons/Table/Table';
import { usePlayer } from '@/context/PlayerContext';

const ProfilePage = () => {
  const { customer } = useAuth();
  const [tracks, setTracks] = useState<TrackDTO[]>([]);
  const [recommendations, setRecommendations] = useState<TrackDTO[]>([]);

  const { setTrackPlayer } = usePlayer();

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
        <Table.Root>
          <Table.Header columns={['Faixa', 'Nota', 'BPM', 'Duração', '⋯']} />

          <Table.Body>
            {tracks.map((track) => (
              <Table.Row key={track.id}>
                <Table.Cell>
                  <div className={styles.trackCell}>
                    <div className={styles.coverWrapper}>
                      <img
                        src={'https://i.pravatar.cc/40?u='}
                        alt={track.title}
                        className={styles.cover}
                      />
                      <button
                        className={styles.playButton}
                        onClick={() => setTrackPlayer(track)}
                        title="Tocar faixa"
                      >
                        ▶
                      </button>
                    </div>

                    <div className={styles.texts}>
                      <strong className={styles.title}>{track.title}</strong>
                      <div className={styles.artists}>
                        {track.artists?.map((artist, index) => (
                          <a
                            key={artist.id}
                            href={`/artist/${artist.id}`}
                            className={styles.artist}
                          >
                            {artist.username}
                            {index < track.artists.length - 1 && ', '}
                          </a>
                        )) || <span>Desconhecido</span>}
                      </div>
                    </div>
                  </div>
                </Table.Cell>

                <Table.Cell>{'1A'}</Table.Cell>
                <Table.Cell>{'180'}</Table.Cell>
                <Table.Cell>{track.duration ?? '—'}</Table.Cell>
                <Table.Cell>
                  <button className={styles.more}>⋯</button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer>{tracks.length} faixas encontradas</Table.Footer>
        </Table.Root>
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
