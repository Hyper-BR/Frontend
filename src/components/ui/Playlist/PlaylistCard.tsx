import { Card } from '@/components/commons/Card';
import { PlaylistLink } from '@/components/commons/Link/PlaylistLink';
import { PlaylistDTO } from '@/services/playlist/types';
import { useNavigate } from 'react-router-dom';

interface Props {
  playlist: PlaylistDTO;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  direction?: 'row' | 'column';
  linkSize?: 'sm' | 'md' | 'lg';

  enableHoverEffect?: boolean;
  droppable?: boolean;
  hovered?: boolean;
  onHover?: (id: string | null) => void;
  onDropTrack?: (trackId: string, targetId: string) => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
}

export function PlaylistCard({
  playlist,
  size = 'md',
  direction = 'row',
  linkSize = 'md',
  droppable = false,
  hovered = false,
  onDropTrack,
  onHover,
  enableHoverEffect,
}: Props) {
  const navigate = useNavigate();

  return (
    <Card.Root
      imageUrl={playlist.coverUrl}
      type="playlist"
      entityId={playlist.id}
      size={size}
      direction={direction}
      clickable
      hovered={hovered}
      droppable={droppable}
      onDropTrack={onDropTrack}
      onHover={onHover}
      onClick={() => navigate(`/playlist/${playlist.id}`)}
      enableHoverEffect={enableHoverEffect}
    >
      <Card.Title>
        <PlaylistLink name={playlist.name} id={playlist.id} size={linkSize} />
      </Card.Title>
    </Card.Root>
  );
}
