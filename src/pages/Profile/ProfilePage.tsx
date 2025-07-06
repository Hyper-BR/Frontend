import { useEffect, useState } from 'react';
import styles from './ProfilePage.module.scss';
import { useAuth } from '@/hooks/useAuth';
import Card from '@/components/commons/Cards/Card';
import { TrackDTO } from '@/services/track/types';
import { getTracksByArtist } from '@/services/track';
import { Table } from '@/components/commons/Table/Table';
import { usePlayer } from '@/context/PlayerContext';
import { PlaylistDTO } from '@/services/playlist/types';
import { addTrackToPlaylist, getPlaylistsCustomer } from '@/services/playlist';

const ProfilePage = () => {
  const { customer } = useAuth();
  const [tracks, setTracks] = useState<TrackDTO[]>([]);
  const [recommendations, setRecommendations] = useState<TrackDTO[]>([]);
  const [playlists, setPlaylists] = useState<PlaylistDTO[]>([]);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const { setTrackPlayer } = usePlayer();

  const toggleOptions = (trackId: string) => {
    setOpenMenuId((prev) => (prev === trackId ? null : trackId));
  };

  const handleAddToPlaylist = async (trackId: string, playlistId: string) => {
    await addTrackToPlaylist(playlistId, trackId);
    setOpenMenuId(null);
  };

  const fetchPlaylists = async () => {
    try {
      const response = await getPlaylistsCustomer();
      setPlaylists(response.data);
    } catch (error) {
      console.error('Erro ao buscar playlists:', error);
    }
  };

  useEffect(() => {
    fetchPlaylists();

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
          <Table.Header columns={['Faixa', 'Nota', 'BPM', 'Duração', '']} />

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
                  <div className={styles.moreWrapper}>
                    <button
                      className={styles.more}
                      onClick={() => toggleOptions(track.id)}
                      aria-haspopup="true"
                      aria-expanded={openMenuId === track.id}
                    >
                      ⋯
                    </button>

                    {openMenuId === track.id && (
                      <div className={styles.dropdown}>
                        <div
                          className={styles.dropdownItemWrapper}
                          onMouseEnter={() => setSelectedTrackId(track.id)}
                          onMouseLeave={() => setSelectedTrackId(null)}
                        >
                          <div className={styles.dropdownItem}>
                            <span>Adicionar à playlist</span>
                            <span className={styles.arrow}>▶</span>
                          </div>

                          {selectedTrackId === track.id && (
                            <div className={styles.submenu}>
                              {playlists.length > 0 ? (
                                playlists.map((playlist) => (
                                  <button
                                    key={playlist.id}
                                    onClick={() =>
                                      handleAddToPlaylist(track.id, playlist.id)
                                    }
                                  >
                                    {playlist.name}
                                  </button>
                                ))
                              ) : (
                                <span className={styles.submenuEmpty}>
                                  Nenhuma playlist encontrada
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
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
