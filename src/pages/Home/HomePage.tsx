import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { getTracks } from '@/services/track';
import { getArtists } from '@/services/artist';
import { TrackDTO } from '@/services/track/types';
import { ArtistDTO } from '@/services/artist/types';
import { ArtistCard } from '@/components/ui/Cards/ArtistCard';
import { TrackCard } from '@/components/ui/Cards/TrackCard';
import { usePlayer } from '@/contexts/PlayerContext';

const Home = () => {
  const [tracks, setTracks] = useState<TrackDTO[]>([]);
  const [artists, setArtists] = useState<ArtistDTO[]>([]);

  const { setTrackList } = usePlayer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tracksResponse, artistsResponse] = await Promise.all([getTracks(), getArtists()]);
        setTrackList(tracksResponse.data.content);
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
            <TrackCard key={track.id} track={track} size="md" direction="column" linkSize="lg" />
          ))}
        </div>
      </section>

      <section>
        <h3>Artistas em alta</h3>
        <div className={styles.carousel}>
          {artists.map((artist) => (
            <ArtistCard artist={artist} size="md" key={artist.id} direction="column" linkSize="lg" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
