import TrackTable from '@/components/ui/Table/TrackTable';
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
      {tab === 'Playlists' && 'Playlists'}
      {tab === 'Álbuns' && 'Álbuns'}
      {tab === 'Artistas relacionados' && 'Artistas relacionados'}
    </div>
  );
}
