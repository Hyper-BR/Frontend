import React, { useState, useEffect } from 'react';
import styles from './TrackTable.module.scss';
import { Button } from '@/components/commons/Button/Button';
import { usePlayer } from '@/contexts/PlayerContext';
import {
  getPlaylistsCustomer,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
} from '@/services/playlist';
import { TrackDTO } from '@/services/track/types';
import { PlaylistDTO } from '@/services/playlist/types';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Table } from '@/components/commons/Table';

type Props = {
  tracks: TrackDTO[];
};

const TrackTable: React.FC<Props> = ({ tracks }) => {
  const [playlists, setPlaylists] = useState<PlaylistDTO[]>([]);
  const { setTrackPlayer } = usePlayer();

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const resp = await getPlaylistsCustomer();
        setPlaylists(resp.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPlaylists();
  }, []);

  const toggleInPlaylist = async (
    trackId: string,
    playlist: PlaylistDTO,
    isMember: boolean,
  ) => {
    if (isMember) {
      await removeTrackFromPlaylist(playlist.id, trackId);
      setPlaylists((prev) =>
        prev.map((pl) =>
          pl.id === playlist.id
            ? { ...pl, tracks: pl.tracks.filter((t) => t.id !== trackId) }
            : pl,
        ),
      );
    } else {
      await addTrackToPlaylist(playlist.id, trackId);
      setPlaylists((prev) =>
        prev.map((pl) =>
          pl.id === playlist.id
            ? { ...pl, tracks: [...pl.tracks, { id: trackId } as any] }
            : pl,
        ),
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <Table.Root>
        <Table.Header
          columns={['Faixa', 'Nota', 'BPM', 'Duração', 'Adicionado em', '']}
        />

        <Table.Body>
          {tracks.map((track) => (
            <Table.DraggableRow
              key={track.id}
              id={track.id}
              title={track.title}
            >
              <Table.Cell>
                <div className={styles.trackCell}>
                  <div className={styles.coverWrapper}>
                    <img
                      src={`https://i.pravatar.cc/40?u=${track.id}`}
                      alt={track.title}
                      className={styles.cover}
                    />
                    <Button
                      variant="transparent"
                      className={styles.playButton}
                      onClick={() => setTrackPlayer(track)}
                      title="Tocar faixa"
                    >
                      ▶
                    </Button>
                  </div>
                  <div className={styles.texts}>
                    <strong className={styles.title}>{track.title}</strong>
                    <div className={styles.artists}>
                      {track.artists && track.artists.length > 0 ? (
                        track.artists.map((artist, i) => (
                          <a
                            key={artist.id}
                            href={`/artist/${artist.id}`}
                            className={styles.artist}
                          >
                            {artist.username}
                            {i < track.artists!.length - 1 && ', '}
                          </a>
                        ))
                      ) : (
                        <span>Desconhecido</span>
                      )}
                    </div>
                  </div>
                </div>
              </Table.Cell>

              <Table.Cell>{track.bpm ?? '--'}</Table.Cell>
              <Table.Cell>{track.bpm ?? '—'}</Table.Cell>
              <Table.Cell>{track.duration ?? '—'}</Table.Cell>
              <Table.Cell>{track.createdDate ?? '—'}</Table.Cell>

              <Table.Cell>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <Button variant="transparent" icon="⋯" />
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className={styles.menu}
                      sideOffset={8}
                      align="start"
                    >
                      <DropdownMenu.Item
                        className={styles.item}
                        onSelect={() => console.log('Editar', track.id)}
                      >
                        Editar
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        className={styles.item}
                        onSelect={() => console.log('Compartilhar', track.id)}
                      >
                        Compartilhar
                      </DropdownMenu.Item>

                      <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger className={styles.item}>
                          Adicionar à playlist +
                        </DropdownMenu.SubTrigger>

                        <DropdownMenu.Portal>
                          <DropdownMenu.SubContent
                            className={styles.submenu}
                            sideOffset={4}
                            alignOffset={-5}
                          >
                            {playlists.length > 0 ? (
                              playlists.map((pl) => {
                                const isMember = pl.tracks.some(
                                  (t) => t.id === track.id,
                                );
                                return (
                                  <DropdownMenu.Item
                                    key={pl.id}
                                    className={`${styles.item} ${
                                      isMember ? styles.inPlaylist : ''
                                    }`}
                                    onSelect={() =>
                                      toggleInPlaylist(track.id, pl, isMember)
                                    }
                                  >
                                    {pl.name}
                                    <span className={styles.icon}>
                                      {isMember ? '✓' : '+'}
                                    </span>
                                  </DropdownMenu.Item>
                                );
                              })
                            ) : (
                              <DropdownMenu.Item
                                className={styles.item}
                                disabled
                              >
                                Nenhuma playlist disponível
                              </DropdownMenu.Item>
                            )}
                          </DropdownMenu.SubContent>
                        </DropdownMenu.Portal>
                      </DropdownMenu.Sub>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </Table.Cell>
            </Table.DraggableRow>
          ))}
        </Table.Body>

        <Table.Footer>{tracks.length} faixas encontradas</Table.Footer>
      </Table.Root>
    </div>
  );
};

export default TrackTable;
