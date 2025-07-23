import { Card } from '@/components/commons/Card';
import { DragDropZone } from '@/components/commons/DragDropZone/DragDropZone';
import { PlaylistLink } from '@/components/commons/Link/PlaylistLink';
import { PlaylistDTO } from '@/services/playlist/types';
import { useNavigate } from 'react-router-dom';

interface Props {
  playlist: PlaylistDTO;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  direction?: 'row' | 'column';
  linkSize?: 'sm' | 'md' | 'lg';

  enableHoverEffect?: boolean;
  hovered?: boolean;
}

export function PlaylistCard({ playlist, size = 'md', direction = 'row', linkSize = 'md', enableHoverEffect }: Props) {
  const navigate = useNavigate();

  return (
    <DragDropZone entityId={playlist.id} droppable>
      <Card.Root
        imageUrl={playlist.coverUrl}
        size={size}
        direction={direction}
        clickable
        enableHoverEffect={enableHoverEffect}
        onClick={() => navigate(`/playlist/${playlist.id}`)}
      >
        <Card.Title>
          <PlaylistLink name={playlist.name} id={playlist.id} size={linkSize} />
        </Card.Title>
      </Card.Root>
    </DragDropZone>
  );
}
