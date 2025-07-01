import { useEffect, useState } from 'react';
import Card from '../../../src/components/commons/Cards/Card';
import styles from './Home.module.scss';
import { getTracks } from '../../../src/services/track';
import { TrackDTO } from '../../../src/services/track/types';
import { getArtists } from '../../../src/services/artist';
import { ArtistDTO } from '../../../src/services/artist/types';
import { usePlayer } from '../../../src/context/PlayerContext';

const Home = () => {
  const [tracks, setTracks] = useState<TrackDTO[]>([]);
  const [artists, setArtists] = useState<ArtistDTO[]>([]);

  const { setTrackPlayer } = usePlayer();

  const fetchTracks = async () => {
    try {
      const response = await getTracks();
      setTracks(response.data.tracks);
    } catch (error) {
      console.error('Erro ao buscar faixas:', error);
    }
  };

  const fetchArtists = async () => {
    try {
      const response = await getArtists();
      setArtists(response.data.artists);
    } catch (error) {
      console.error('Erro ao buscar faixas:', error);
    }
  };

  useEffect(() => {
    fetchTracks();
    fetchArtists();
  }, []);

  return (
    <div className={styles.home}>
      <section>
        <h3>Faixas em destaque</h3>
        <div className={styles.carousel}>
          {tracks.map((track) => (
            <Card
              key={track.id}
              image={'https://i.pravatar.cc/40?u='}
              title={track.name}
              subtitle={track.artist?.username}
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
              image={`https://i.pravatar.cc/40?u=`}
              title={artist.username}
              onClick={() => console.log(`Entrar ${artist.username}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
