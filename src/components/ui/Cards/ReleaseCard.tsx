import { Card } from '@/components/commons/Card';
import { DragDropZone } from '@/components/commons/DragDropZone/DragDropZone';
import { ReleaseLink } from '@/components/commons/Link/ReleaseLink';
import { ReleaseDTO } from '@/services/release/types';
import { useNavigate } from 'react-router-dom';

interface Props {
  release: ReleaseDTO;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  direction?: 'row' | 'column';
  linkSize?: 'sm' | 'md' | 'lg';
  enableHoverEffect?: boolean;
}

export function ReleaseCard({ release, size = 'md', direction = 'row', linkSize = 'md', enableHoverEffect }: Props) {
  const navigate = useNavigate();

  return (
    <DragDropZone entityId={release.id} droppable>
      <Card.Root
        imageUrl={release.coverUrl}
        size={size}
        direction={direction}
        clickable
        enableBackground={enableHoverEffect}
        onClick={() => navigate(`/release/${release.id}`)}
      >
        <Card.Title>
          <ReleaseLink name={release.title} id={release.id} size={linkSize} />
        </Card.Title>
      </Card.Root>
    </DragDropZone>
  );
}
