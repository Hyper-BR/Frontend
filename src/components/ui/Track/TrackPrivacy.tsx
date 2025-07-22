import { LockKeyhole, LockKeyholeOpen } from 'lucide-react';
import { clsx } from 'clsx';
import styles from './TrackPrivacy.module.scss';

interface Props {
  value?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'muted' | 'white';
}

export function TrackPrivacy({ value, size = 'md', color = 'muted' }: Props) {
  const classes = clsx(styles[size], styles[color]);

  if (value === 'PRIVATE') {
    return (
      <div className={clsx(styles.icon, styles[color])}>
        <LockKeyhole className={classes} />
        <span>Privado</span>
      </div>
    );
  }

  if (value === 'PUBLIC') {
    return (
      <div className={clsx(styles.icon, styles[color])}>
        <LockKeyholeOpen className={classes} />
        <span>Público</span>
      </div>
    );
  }

  return <span className={styles.placeholder}>—</span>;
}
