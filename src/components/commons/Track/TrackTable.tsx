import styles from './TrackTable.module.scss';
import { Table } from '@/components/commons/Table/Table';
import { TrackDTO } from '@/services/track/types';
import { PlaylistDTO } from '@/services/playlist/types';
import { usePlayer } from '@/context/PlayerContext';

type Props = {
  tracks: TrackDTO[];
  playlists: PlaylistDTO[];
  openMenuId: string | null;
  selectedTrackId: string | null;
  toggleOptions: (trackId: string) => void;
  setSelectedTrackId: (id: string | null) => void;
  handleAddToPlaylist: (trackId: string, playlistId: string) => void;
};

const TrackTable = ({
  tracks,
  playlists,
  openMenuId,
  selectedTrackId,
  toggleOptions,
  setSelectedTrackId,
  handleAddToPlaylist,
}: Props) => {
  const { setTrackPlayer } = usePlayer();

  return (
    <div className={styles.wrapper}>
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
    </div>
  );
};

export default TrackTable;
