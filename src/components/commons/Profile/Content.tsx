import TrackTable from '@/components/ui/Tracks/TrackTable';
import { Tab } from './Tabs';
import { TrackDTO } from '@/services/track/types';
import styles from './Profile.module.scss';

interface Props {
  tab: Tab;
  tracks: TrackDTO[];
}

export function Content({ tab, tracks }: Props) {
  return (
    <div className={styles.tabContent}>
      {tab === 'Faixas' && <TrackTable tracks={tracks ?? []} />}
      {tab === 'Playlists' && <TrackTable tracks={tracks ?? []} />}
      {tab === 'Álbuns' && <TrackTable tracks={tracks ?? []} />}
      {tab === 'Artistas relacionados' && <TrackTable tracks={tracks ?? []} />}
    </div>
  );
}
