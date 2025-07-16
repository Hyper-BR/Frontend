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
  clickable?: boolean;
  onClick?: () => void;
}

export function Root({
  children,
  imageUrl,
  size = 'md',
  shape = 'square',
  align = 'center',
  clickable = false,
  direction = 'row',
  onClick,
}: Props) {
  return (
    <div
      className={clsx(
        styles.card,
        styles[size],
        styles[shape],
        styles[align],
        styles[direction],
        clickable && styles.clickable,
      )}
      onClick={clickable ? onClick : undefined}
    >
      <div className={clsx(styles.imageWrapper, styles[size], styles[shape])}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${buildFullUrl(imageUrl)})` }}
        />
      </div>

      <div className={styles.info}>{children}</div>
    </div>
  );
}
