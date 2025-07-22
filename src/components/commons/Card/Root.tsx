import { buildFullUrl } from '@/utils/buildFullUrl';
import styles from './Card.module.scss';
import clsx from 'clsx';

interface Props {
  children: React.ReactNode;
  imageUrl: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'square' | 'round';
  align?: 'left' | 'center';
  direction?: 'row' | 'column';
  enableHoverEffect?: boolean;
  clickable?: boolean;
  onClick?: () => void;

  type?: 'track' | 'artist' | 'playlist';
  entityId?: string;

  droppable?: boolean;
  hovered?: boolean;
  onHover?: (id: string | null) => void;
  onDropTrack?: (trackId: string, targetId: string) => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
}

export function Root({
  children,
  imageUrl,
  size = 'md',
  shape = 'square',
  align = 'center',
  direction = 'row',
  clickable = false,
  onClick,
  type,
  entityId,
  droppable = false,
  hovered = false,
  enableHoverEffect = false,
  draggable = false,
  onDragStart,
  onHover,
  onDropTrack,
}: Props) {
  const isPlaylist = type === 'playlist' && droppable;

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isPlaylist) return;
    e.preventDefault();
    onHover?.(entityId ?? null);
  };

  const handleDragLeave = () => {
    if (!isPlaylist) return;
    onHover?.(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isPlaylist) return;
    e.preventDefault();
    const trackId = e.dataTransfer.getData('text/plain');
    if (trackId) {
      onDropTrack?.(trackId, entityId ?? '');
      onHover?.(null);
    }
  };

  return (
    <div
      className={clsx(
        styles.card,
        styles[size],
        styles[shape],
        styles[align],
        styles[direction],
        enableHoverEffect && styles.hoveredCard,
        clickable && styles.clickable,
        isPlaylist && hovered && styles.droppableHover,
      )}
      onClick={clickable ? onClick : undefined}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={clsx(styles.imageWrapper, styles[size], styles[shape])}>
        <img className={styles.image} src={buildFullUrl(imageUrl)} />
      </div>

      <div className={styles.info}>{children}</div>
    </div>
  );
}
