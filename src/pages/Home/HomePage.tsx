import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { getTracks } from '@/services/track';
import { getArtists } from '@/services/artist';
import { TrackDTO } from '@/services/track/types';
import { ArtistDTO } from '@/services/artist/types';
import { usePlayer } from '@/context/PlayerContext';
import { useNavigate } from 'react-router-dom';
import ArtistCard from '@/components/commons/Cards/ArtistCard';
import TrackCard from '@/components/commons/Cards/TrackCard';

const Home = () => {
  const [tracks, setTracks] = useState<TrackDTO[]>([]);
  const [artists, setArtists] = useState<ArtistDTO[]>([]);

  const { setTrackPlayer } = usePlayer();

  const navigate = useNavigate();

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
            <TrackCard
              key={track.id}
              track={track}
              onPlay={() => setTrackPlayer(track)}
            />
          ))}
        </div>
      </section>

      <section>
        <h3>Artistas em alta</h3>
        <div className={styles.carousel}>
          {artists.map((artist) => (
            <ArtistCard
              key={artist.id}
              image={'https://i.pravatar.cc/1579?u='}
              name={artist.username}
              onClick={() => navigate(`/artist/${artist.id}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
