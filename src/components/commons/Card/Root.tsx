import styles from './Card.module.scss';
import clsx from 'clsx';

interface Props {
  children: React.ReactNode;
  imageUrl: string;
  size?: 'sm' | 'md' | 'lg';
  shape?: 'square' | 'round';
  align?: 'left' | 'center';
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
  onClick,
}: Props) {
  return (
    <div
      className={clsx(
        styles.card,
        styles[size],
        styles[shape],
        styles[align],
        clickable && styles.clickable,
      )}
      onClick={clickable ? onClick : undefined}
    >
      <div className={clsx(styles.imageWrapper, styles[size], styles[shape])}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </div>

      <div className={styles.info}>{children}</div>
    </div>
  );
}
