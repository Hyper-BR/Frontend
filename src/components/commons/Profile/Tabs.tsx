import styles from './Profile.module.scss';
import { Button } from '../Button/Button';

export const tabsOwner = ['Faixas', 'Playlists', 'Álbuns', 'Seguindo', 'Artistas relacionados', 'Insights'] as const;

export const tabs = ['Faixas', 'Playlists', 'Álbuns', 'Seguindo', 'Artistas relacionados'] as const;

export type Tab = (typeof tabs)[number] | (typeof tabsOwner)[number];

interface Props {
  active: Tab;
  setActive: (tab: Tab) => void;
  owner?: boolean;
}

export function Tabs({ active, setActive, owner }: Props) {
  const currentTabs = owner ? tabsOwner : tabs;

  return (
    <nav className={styles.tabNav}>
      {currentTabs.map((tab) => (
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
