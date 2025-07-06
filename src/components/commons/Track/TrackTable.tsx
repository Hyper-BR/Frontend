import styles from './TrackTable.module.scss';
import { Table } from '@/components/commons/Table/Table';
import { TrackDTO } from '@/services/track/types';
import { PlaylistDTO } from '@/services/playlist/types';
import { usePlayer } from '@/context/PlayerContext';
import { useEffect, useRef, useState } from 'react';
import DropdownPortal from '../Dropdown/DropdownPortal';
import {
  getPlaylistsCustomer,
  removeTrackFromPlaylist,
} from '@/services/playlist';

type Props = {
  tracks: TrackDTO[];
  selectedTrackId: string | null;
  setSelectedTrackId: (id: string | null) => void;
  handleAddToPlaylist: (trackId: string, playlistId: string) => void;
};

const TrackTable = ({
  tracks,
  selectedTrackId,
  setSelectedTrackId,
  handleAddToPlaylist,
}: Props) => {
  const [playlists, setPlaylists] = useState<PlaylistDTO[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const { setTrackPlayer } = usePlayer();
  const moreButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>(
    {},
  );

  // 1) Carrega todas as playlists do usuário (cada PlaylistDTO já inclui .tracks[])
  useEffect(() => {
    const fetch = async () => {
      try {
        const resp = await getPlaylistsCustomer();
        setPlaylists(resp.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  // 2) Toggle dropdown e posicionamento
  const toggleOptions = (trackId: string) => {
    if (openMenuId === trackId) {
      setOpenMenuId(null);
      setDropdownPosition(null);
      return;
    }
    const btn = moreButtonRefs.current[trackId];
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    setOpenMenuId(trackId);
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
  };

  // 3) Remove track de playlist e atualiza o estado local
  const handleRemove = async (trackId: string, playlistId: string) => {
    await removeTrackFromPlaylist(playlistId, trackId);
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlistId
          ? {
              ...pl,
              tracks: pl.tracks.filter((t) => t.id !== trackId),
            }
          : pl,
      ),
    );
  };

  return (
    <div className={styles.wrapper}>
      <Table.Root>
        <Table.Header columns={['Faixa', 'Nota', 'BPM', 'Duração', '']} />
        <Table.Body>
          {tracks.map((track) => {
            const isOpen = openMenuId === track.id;
            return (
              <Table.DraggableRow
                key={track.id}
                id={track.id}
                title={track.title}
              >
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
                <Table.Cell>1A</Table.Cell>
                <Table.Cell>180</Table.Cell>
                <Table.Cell>{track.duration ?? '—'}</Table.Cell>
                <Table.Cell>
                  <div className={styles.moreWrapper}>
                    <button
                      ref={(el) => (moreButtonRefs.current[track.id] = el)}
                      className={styles.more}
                      onClick={() => toggleOptions(track.id)}
                    >
                      ⋯
                    </button>
                  </div>

                  {isOpen && dropdownPosition && (
                    <DropdownPortal
                      top={dropdownPosition.top}
                      left={dropdownPosition.left}
                    >
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
                                playlists.map((pl) => {
                                  // 4) verifica se já há essa track nessa playlist
                                  const isMember = pl.tracks.some(
                                    (t) => t.id === track.id,
                                  );
                                  return (
                                    <button
                                      key={pl.id}
                                      className={
                                        isMember ? styles.inPlaylist : ''
                                      }
                                      onClick={() =>
                                        isMember
                                          ? handleRemove(track.id, pl.id)
                                          : handleAddToPlaylist(track.id, pl.id)
                                      }
                                    >
                                      {pl.name}
                                      <span className={styles.icon}>
                                        {isMember ? '✓' : '+'}
                                      </span>
                                    </button>
                                  );
                                })
                              ) : (
                                <span className={styles.submenuEmpty}>
                                  Nenhuma playlist encontrada
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </DropdownPortal>
                  )}
                </Table.Cell>
              </Table.DraggableRow>
            );
          })}
        </Table.Body>
        <Table.Footer>{tracks.length} faixas encontradas</Table.Footer>
      </Table.Root>
    </div>
  );
};

export default TrackTable;
