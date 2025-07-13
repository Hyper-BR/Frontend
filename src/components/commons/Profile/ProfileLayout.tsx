import { useState } from 'react';
import styles from './ProfileLayout.module.scss';
import { TrackDTO, TrackPageDTO } from '@/services/track/types';
import { PlaylistDTO } from '@/services/playlist/types';
import { CurrentPlanCard } from '../Cards/CurrentPlanCard';
import TrackTable from '../Track/TrackTable';
import { Button } from '../Button/Button';

interface Props {
  avatarUrl: string;
  name: string;
  email?: string;
  stats: { followers: number; following: number };
  analytics?: { plays: number; followers: number };
  onEdit?: () => void;
  tracks: TrackPageDTO;
  playlists: PlaylistDTO[];
  owner?: boolean;
}

const tabs = [
  'Faixas',
  'Playlists',
  'Álbuns',
  'Artistas relacionados',
] as const;
type Tab = (typeof tabs)[number];

export default function ProfileLayout({
  avatarUrl,
  name,
  email,
  stats,
  analytics,
  onEdit,
  tracks,
  playlists,
  owner,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('Faixas');

  return (
    <section className={styles.profile}>
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <img src={avatarUrl} alt={name} className={styles.avatar} />
          <div className={styles.details}>
            <h2>{name}</h2>
            {email && <p className={styles.email}>{email}</p>}
            {onEdit && (
              <Button
                className={styles.editBtn}
                variant="ghost"
                onClick={onEdit}
              >
                Editar perfil
              </Button>
            )}
            <div className={styles.stats}>
              <span>
                <strong>{stats.followers}</strong> seguidores
              </span>
              <span>
                <strong>{stats.following}</strong> seguindo
              </span>
            </div>
          </div>
        </div>

        {owner && (
          <div className={styles.planSection}>
            <CurrentPlanCard />
          </div>
        )}
      </header>

      {analytics && (
        <div className={styles.analytics}>
          <span>Reproduções: {analytics.plays}</span>
          <span>Seguidores: {analytics.followers}</span>
        </div>
      )}

      <nav className={styles.tabNav}>
        {tabs.map((tab) => (
          <Button
            variant="transparent"
            onClick={() => setActiveTab(tab)}
            className={tab === activeTab ? styles.activeTab : styles.tab}
          >
            {tab}
          </Button>
        ))}
      </nav>

      {tracks?.content && (
        <div className={styles.tabContent}>
          {activeTab === 'Faixas' && <TrackTable tracks={tracks.content} />}
          {activeTab === 'Playlists' && <TrackTable tracks={tracks.content} />}
          {activeTab === 'Álbuns' && <TrackTable tracks={tracks.content} />}
          {activeTab === 'Artistas relacionados' && (
            <TrackTable tracks={tracks.content} />
          )}
        </div>
      )}
    </section>
  );
}
