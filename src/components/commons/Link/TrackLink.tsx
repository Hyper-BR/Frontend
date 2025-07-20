import { Link } from 'react-router-dom';
import styles from './Link.module.scss';
import clsx from 'clsx';

interface Props {
  title: string;
  id: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'muted';
  onClick?: () => void;
}

export function TrackLink({ title, id, onClick, size = 'md', color = 'white' }: Props) {
  return (
    <Link
      to={`/track/${id}`}
      className={clsx(styles.link, styles[size], styles[color])}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      {title}
    </Link>
  );
}
