import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchArtists, searchTracks } from '@/services/search';
import { ArtistDTO } from '@/services/artist/types';
import { TrackDTO } from '@/services/track/types';
import styles from './SearchPage.module.scss';
import { usePlayer } from '@/contexts/PlayerContext';
import { Track } from '@/components/ui/Cards/Track';
import { Artist } from '@/components/ui/Cards/Artist';

function useQuery() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  return params.get('q') ?? '';
}

export default function SearchPage() {
  const q = useQuery();
  const navigate = useNavigate();
  const { setTrackPlayer } = usePlayer();

  const [artists, setArtists] = useState<ArtistDTO[]>([]);
  const [tracks, setTracks] = useState<TrackDTO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) return;
    setLoading(true);
    Promise.all([searchArtists(q, 0, 10), searchTracks(q, 0, 10)])
      .then(([aRes, tRes]) => {
        setArtists(aRes.data.content);
        setTracks(tRes.data.content);
      })
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button onClick={() => navigate(-1)}>← Voltar</button>
        <h1>Resultados para “{q}”</h1>
      </header>

      {loading && <p>Carregando resultados…</p>}

      {!loading && (
        <>
          <section className={styles.section}>
            <h2>Artistas</h2>
            {artists.length ? (
              <>
                {artists.map((artist) => (
                  <Artist
                    name={artist.username}
                    size="lg"
                    key={artist.id}
                    imageUrl="https://i.pravatar.cc/1579?u="
                    onClick={() => navigate(`/artist/${artist.id}`)}
                  />
                ))}
              </>
            ) : (
              <p>Nenhum artista encontrado.</p>
            )}
          </section>

          <section className={styles.section}>
            <h2>Faixas</h2>
            {tracks.length ? (
              <>
                {tracks.map((track) => (
                  <Track
                    key={track.id}
                    name={track.title}
                    artists={track.artists.map((a) => a.username).join(', ')}
                    imageUrl="https://i.pravatar.cc/1579?u="
                    onClick={() => setTrackPlayer(track)}
                    size="md"
                  />
                ))}
              </>
            ) : (
              <p>Nenhuma faixa encontrada.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
}
