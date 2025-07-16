import styles from './Profile.module.scss';
import { Button } from '../Button/Button';

export const tabs = [
  'Faixas',
  'Playlists',
  'Álbuns',
  'Artistas relacionados',
] as const;
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
          variant="transparent"
          onClick={() => setActive(tab)}
          className={tab === active ? styles.activeTab : styles.tab}
        >
          {tab}
        </Button>
      ))}
    </nav>
  );
}
