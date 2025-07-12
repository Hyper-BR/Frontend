import { useState } from 'react';
import styles from './ProfileLayout.module.scss';
import { TrackDTO } from '@/services/track/types';
import { PlaylistDTO } from '@/services/playlist/types';
import { CurrentPlanCard } from '../Cards/CurrentPlanCard';
import TrackTable from '../Track/TrackTable';

interface Props {
  avatarUrl: string;
  name: string;
  email?: string;
  stats: { followers: number; following: number };
  analytics?: { plays: number; followers: number };
  onEdit?: () => void;
  tracks: TrackDTO[];
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
              <button className={styles.editBtn} onClick={onEdit}>
                Editar perfil
              </button>
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
          <button
            key={tab}
            className={tab === activeTab ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className={styles.tabContent}>
        {activeTab === 'Faixas' && <TrackTable tracks={tracks} />}
        {activeTab === 'Playlists' && <TrackTable tracks={tracks} />}
        {activeTab === 'Álbuns' && <TrackTable tracks={tracks} />}
        {activeTab === 'Artistas relacionados' && (
          <TrackTable tracks={tracks} />
        )}
      </div>
    </section>
  );
}
