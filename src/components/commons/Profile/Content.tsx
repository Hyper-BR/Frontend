import TrackTable from '@/components/ui/Table/TrackTable';
import { Tab } from './Tabs';
import { TrackDTO } from '@/services/track/types';
import styles from './Profile.module.scss';
import { PlaylistDTO } from '@/services/playlist/types';
import { Card } from '../Card';
import { PlaylistCard } from '@/components/ui/Cards/PlaylistCard';
import { Insights } from '@/components/ui/Insights/Insights';
import { ReleaseCard } from '@/components/ui/Cards/ReleaseCard';
import { ReleaseDTO } from '@/services/release/types';

interface Props {
  tab: Tab;
  tracks: TrackDTO[];
  playlists: PlaylistDTO[];
  releases: ReleaseDTO[];
  owner?: boolean;
}

export function Content({ tab, tracks, playlists, releases, owner }: Props) {
  return (
    <div className={styles.tabContent}>
      {tab === 'Faixas' && <TrackTable tracks={tracks ?? []} />}
      {tab === 'Playlists' && (
        <Card.Grid>
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} size="lg" direction="column" />
          ))}
        </Card.Grid>
      )}
      {tab === 'Álbuns' && (
        <Card.Grid>
          {releases.map((release) => (
            <ReleaseCard key={release.id} release={release} size="lg" direction="column" />
          ))}
        </Card.Grid>
      )}
      {tab === 'Seguindo' && 'Seguindo'}
      {tab === 'Artistas relacionados' && 'Artistas relacionados'}
      {tab === 'Insights' && owner && <Insights />}
    </div>
  );
}
