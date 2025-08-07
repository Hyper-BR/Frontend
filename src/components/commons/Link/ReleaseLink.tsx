import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Link.module.scss';

interface Props {
  name: string;
  id: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'white' | 'muted';
  onClick?: () => void;
}

export function ReleaseLink({ name, id, onClick, size = 'sm', color = 'white' }: Props) {
  return (
    <Link
      to={`/release/${id}`}
      className={clsx(styles.link, styles[size], styles[color])}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      {name}
    </Link>
  );
}
