import { Link } from 'react-router-dom';
import styles from './Link.module.scss';
import clsx from 'clsx';
import { TrackDTO } from '@/services/track/types';

interface Props {
  track: TrackDTO;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'white' | 'muted';
  onClick?: () => void;
}

export function TrackLink({ track, onClick, size = 'md', color = 'white' }: Props) {
  return (
    <Link
      to={`/track/${track?.id}`}
      className={clsx(styles.link, styles[size], styles[color])}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      {track?.title}
    </Link>
  );
}
