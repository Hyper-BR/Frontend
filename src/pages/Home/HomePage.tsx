import { useEffect, useState } from 'react';
import Card from '../../../src/components/commons/Cards/Card';
import styles from './Home.module.scss';
import { getTracks } from '../../../src/services/track';
import { getArtists } from '../../../src/services/artist';
import { TrackDTO } from '../../../src/services/track/types';
import { ArtistDTO } from '../../../src/services/artist/types';
import { usePlayer } from '../../../src/context/PlayerContext';

const Home = () => {
  const [tracks, setTracks] = useState<TrackDTO[]>([]);
  const [artists, setArtists] = useState<ArtistDTO[]>([]);
  const { setTrackPlayer } = usePlayer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tracksResponse, artistsResponse] = await Promise.all([
          getTracks(),
          getArtists(),
        ]);

        setTracks(tracksResponse.data.content);
        setArtists(artistsResponse.data.content);
      } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.home}>
      <section>
        <h3>Faixas em destaque</h3>
        <div className={styles.carousel}>
          {tracks.map((track) => (
            <Card
              key={track.id}
              image={'https://i.pravatar.cc/123?u='}
              title={track.title}
              subtitle={track.artists}
              onClick={() => setTrackPlayer(track)}
            />
          ))}
        </div>
      </section>

      <section>
        <h3>Artistas em alta</h3>
        <div className={styles.carousel}>
          {artists.map((artist) => (
            <Card
              key={artist.id}
              image={`https://i.pravatar.cc/1579?u=`}
              title={artist.username}
              onClick={() =>
                console.log(`Visualizar perfil de ${artist.username}`)
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
