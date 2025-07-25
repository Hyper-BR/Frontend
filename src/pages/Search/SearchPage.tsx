import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchArtists, searchTracks } from '@/services/search';
import { ArtistDTO } from '@/services/artist/types';
import { TrackDTO } from '@/services/track/types';
import styles from './SearchPage.module.scss';
import { usePlayer } from '@/contexts/PlayerContext';
import { TrackCard } from '@/components/ui/Cards/TrackCard';
import { ArtistCard } from '@/components/ui/Cards/ArtistCard';
import { Button } from '@/components/commons/Button/Button';

function useQuery() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  return params.get('q') ?? '';
}

export default function SearchPage() {
  const q = useQuery();
  const navigate = useNavigate();

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
        <Button onClick={() => navigate(-1)} variant="ghost">
          ← Voltar
        </Button>
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
                  <ArtistCard artist={artist} size="lg" key={artist.id} />
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
                  <TrackCard key={track.id} track={track} size="md" />
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
