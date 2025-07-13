import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { getTracks } from '@/services/track';
import { getArtists } from '@/services/artist';
import { TrackDTO } from '@/services/track/types';
import { ArtistDTO } from '@/services/artist/types';
import { useNavigate } from 'react-router-dom';
import { Artist } from '@/components/ui/Cards/Artist';
import { Track } from '@/components/ui/Cards/Track';

const Home = () => {
  const [tracks, setTracks] = useState<TrackDTO[]>([]);
  const [artists, setArtists] = useState<ArtistDTO[]>([]);

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
            <Track key={track.id} track={track} size="md" />
          ))}
        </div>
      </section>

      <section>
        <h3>Artistas em alta</h3>
        <div className={styles.carousel}>
          {artists.map((artist) => (
            <Artist
              name={artist.username}
              size="md"
              key={artist.id}
              imageUrl="https://i.pravatar.cc/1579?u="
              onClick={() => navigate(`/artist/${artist.id}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
