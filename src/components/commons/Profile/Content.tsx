import TrackTable from '@/components/ui/Track/TrackTable';
import { Tab } from './Tabs';
import { TrackDTO } from '@/services/track/types';
import styles from './Profile.module.scss';
import { PlaylistGrid } from '@/components/ui/Playlist/PlaylistGrid';
import { PlaylistDTO } from '@/services/playlist/types';

interface Props {
  tab: Tab;
  tracks: TrackDTO[];
  playlists: PlaylistDTO[];
}

export function Content({ tab, tracks, playlists }: Props) {
  return (
    <div className={styles.tabContent}>
      {tab === 'Faixas' && <TrackTable tracks={tracks ?? []} />}
      {tab === 'Playlists' && <PlaylistGrid playlists={playlists} />}
      {tab === 'Álbuns' && 'Álbuns'}
      {tab === 'Artistas relacionados' && 'Artistas relacionados'}
    </div>
  );
}
