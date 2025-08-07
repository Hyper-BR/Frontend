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
  enableBackground?: boolean;
  clickable?: boolean;
  onClick?: () => void;
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
  enableBackground = false,
}: Props) {
  return (
    <div
      className={clsx(
        styles.card,
        styles[size],
        styles[shape],
        styles[align],
        styles[direction],
        enableBackground && styles.enableBackground,
        clickable && styles.clickable,
      )}
      onClick={clickable ? onClick : undefined}
    >
      <div className={clsx(styles.imageWrapper, styles[size], styles[shape])}>
        <img className={styles.image} src={buildFullUrl(imageUrl)} />
      </div>

      <div className={styles.info}>{children}</div>
    </div>
  );
}
