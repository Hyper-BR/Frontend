import styles from './Profile.module.scss';
import { Button } from '../Button/Button';

export const tabs = ['Faixas', 'Playlists', 'Álbuns', 'Feed', 'Seguindo', 'Artistas relacionados', 'Insights'] as const;
export type Tab = (typeof tabs)[number];

interface Props {
  active: Tab;
  setActive: (tab: Tab) => void;
}

export function Tabs({ active, setActive }: Props) {
  return (
    <nav className={styles.tabNav}>
      {tabs.map((tab) => (
        <Button
          key={tab}
          variant="muted"
          onClick={() => setActive(tab)}
          className={tab === active ? styles.activeTab : styles.tab}
        >
          {tab}
        </Button>
      ))}
    </nav>
  );
}
