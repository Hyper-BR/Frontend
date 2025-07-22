import styles from './PlaylistGrid.module.scss';
import { PlaylistCard } from './PlaylistCard';
import { PlaylistDTO } from '@/services/playlist/types';

interface Props {
  playlists: PlaylistDTO[];
}

export function PlaylistGrid({ playlists }: Props) {
  return (
    <div className={styles.grid}>
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist.id} playlist={playlist} size="lg" direction="column" />
      ))}
    </div>
  );
}
