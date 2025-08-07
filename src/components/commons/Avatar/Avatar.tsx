import { buildFullUrl } from '@/utils/buildFullUrl';
import styles from './Avatar.module.scss';

interface Props {
  src: string;
  size?: number;
  alt?: string;
}

export function Avatar({ src, size = 40, alt = 'Avatar' }: Props) {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return <img className={styles.avatar} style={style} aria-label={alt} src={buildFullUrl(src)} />;
}
