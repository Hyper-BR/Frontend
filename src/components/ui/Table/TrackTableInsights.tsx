import React from 'react';
import { Button } from '@/components/commons/Button/Button';
import { TrackDTO } from '@/services/track/types';
import { Table } from '@/components/commons/Table';
import { Dropdown } from '@/components/commons/Dropdown';
import { TrackCard } from '../Cards/TrackCard';
import { formatZonedDate } from '@/utils/formatTime';
import { TrackPrivacy } from '../Track/TrackPrivacy';

type Props = {
  tracks: TrackDTO[];
};

const TrackTableInsights: React.FC<Props> = ({ tracks }) => {
  return (
    <Table.Root>
      <Table.Header columns={['Faixa', 'Comprados', 'Baixados', 'Adicionado em', 'Privacidade', 'Plays', '']} />

      <Table.Body>
        {tracks.map((track) => (
          <Table.DraggableRow key={track.id} id={track.id} title={track.title} dragType="track">
            <Table.Cell>
              <TrackCard track={track} size="xs" direction="row" align="left" firstLinkSize="lg" secondLinkSize="md" />
            </Table.Cell>

            <Table.Cell>{track.purchases}</Table.Cell>
            <Table.Cell>{track.downloads}</Table.Cell>
            <Table.Cell>{formatZonedDate(track.createdDate)}</Table.Cell>
            <Table.Cell>
              <TrackPrivacy value={track.privacy} size="md" color="muted" />
            </Table.Cell>
            <Table.Cell>{track.plays}</Table.Cell>

            <Table.Cell>
              <Dropdown.Root>
                <Dropdown.Trigger>
                  <Button variant="muted" icon="⋯" />
                </Dropdown.Trigger>

                <Dropdown.Content size="md">fazer um chart aqui com mais infos</Dropdown.Content>
              </Dropdown.Root>
            </Table.Cell>
          </Table.DraggableRow>
        ))}
      </Table.Body>

      <Table.Footer>{tracks.length} faixas encontradas</Table.Footer>
    </Table.Root>
  );
};

export default TrackTableInsights;
