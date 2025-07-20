import React, { useState, useEffect } from 'react';
import { Button } from '@/components/commons/Button/Button';
import { getPlaylistsCustomer, addTrackToPlaylist, removeTrackFromPlaylist } from '@/services/playlist';
import { TrackDTO } from '@/services/track/types';
import { PlaylistDTO } from '@/services/playlist/types';
import { Table } from '@/components/commons/Table';
import { Dropdown } from '@/components/commons/Dropdown';
import { TrackCard } from '../Cards/TrackCard';
import { formatSecondsTime, formatZonedDate } from '@/utils/formatTime';

type Props = {
  tracks: TrackDTO[];
};

const TrackTable: React.FC<Props> = ({ tracks }) => {
  const [playlists, setPlaylists] = useState<PlaylistDTO[]>([]);

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

  const toggleInPlaylist = async (trackId: string, playlist: PlaylistDTO, isMember: boolean) => {
    if (isMember) {
      await removeTrackFromPlaylist(playlist.id, trackId);
      setPlaylists((prev) =>
        prev.map((pl) => (pl.id === playlist.id ? { ...pl, tracks: pl.tracks.filter((t) => t.id !== trackId) } : pl)),
      );
    } else {
      await addTrackToPlaylist(playlist.id, trackId);
      setPlaylists((prev) =>
        prev.map((pl) => (pl.id === playlist.id ? { ...pl, tracks: [...pl.tracks, { id: trackId } as any] } : pl)),
      );
    }
  };

  return (
    <Table.Root>
      <Table.Header columns={['Faixa', 'Nota', 'BPM', 'Duração', 'Adicionado em', '']} />

      <Table.Body>
        {tracks.map((track) => (
          <Table.DraggableRow key={track.id} id={track.id} title={track.title}>
            <Table.Cell>
              <TrackCard track={track} size="xs" direction="row" align="left" />
            </Table.Cell>

            <Table.Cell>{track.key ?? '--'}</Table.Cell>
            <Table.Cell>{track.bpm ?? '—'}</Table.Cell>
            <Table.Cell>{formatSecondsTime(track.duration) ?? '—'}</Table.Cell>
            <Table.Cell>{formatZonedDate(track.createdDate) ?? '—'}</Table.Cell>

            <Table.Cell>
              <Dropdown.Root>
                <Dropdown.Trigger>
                  <Button variant="transparent" icon="⋯" />
                </Dropdown.Trigger>

                <Dropdown.Content size="md">
                  <Dropdown.Item onClick={() => {}}>Editar</Dropdown.Item>
                  <Dropdown.Item onClick={() => {}}>Compartilhar</Dropdown.Item>

                  <Dropdown.Submenu label="Adicionar à playlist +">
                    {playlists.map((pl) => {
                      const isMember = pl.tracks.some((t) => t.id === track.id);
                      return (
                        <Dropdown.Item
                          key={pl.id}
                          onClick={() => toggleInPlaylist(track.id, pl, isMember)}
                          rightIcon={isMember ? '✓' : '+'}
                        >
                          {pl.name}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Submenu>
                </Dropdown.Content>
              </Dropdown.Root>
            </Table.Cell>
          </Table.DraggableRow>
        ))}
      </Table.Body>

      <Table.Footer>{tracks.length} faixas encontradas</Table.Footer>
    </Table.Root>
  );
};

export default TrackTable;
