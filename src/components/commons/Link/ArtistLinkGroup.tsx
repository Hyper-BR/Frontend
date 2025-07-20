import { ArtistDTO } from '@/services/artist/types';
import { ArtistLink } from './ArtistLink';
import styles from './Link.module.scss';

interface Props {
  artists: ArtistDTO[];
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'white' | 'muted';
  onClick?: (id: string) => void;
}

export function ArtistLinkGroup({ artists = [], size = 'sm', color = 'white', onClick }: Props) {
  return (
    <div className={styles.artistLinkGroup}>
      {artists.map((artist, index) => (
        <span key={artist.id}>
          <ArtistLink
            name={artist.username}
            id={artist.id}
            size={size}
            color={color}
            onClick={() => onClick?.(artist.id)}
          />
          {index < artists.length - 1 && ', '}
        </span>
      ))}
    </div>
  );
}
