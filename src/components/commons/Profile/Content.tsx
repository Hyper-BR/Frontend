import TrackTable from '@/components/ui/Track/TrackTable';
import { Tab } from './Tabs';
import { TrackDTO } from '@/services/track/types';
import styles from './Profile.module.scss';
import { PlaylistDTO } from '@/services/playlist/types';
import { Card } from '../Card';
import { PlaylistCard } from '@/components/ui/Playlist/PlaylistCard';

interface Props {
  tab: Tab;
  tracks: TrackDTO[];
  playlists: PlaylistDTO[];
}

export function Content({ tab, tracks, playlists }: Props) {
  return (
    <div className={styles.tabContent}>
      {tab === 'Faixas' && <TrackTable tracks={tracks ?? []} />}
      {tab === 'Playlists' && (
        <Card.Grid>
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} size="xl" direction="column" />
          ))}
        </Card.Grid>
      )}
      {tab === 'Álbuns' && 'Álbuns'}
      {tab === 'Artistas relacionados' && 'Artistas relacionados'}
    </div>
  );
}
