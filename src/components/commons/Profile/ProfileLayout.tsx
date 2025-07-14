import { useState } from 'react';
import styles from './ProfileLayout.module.scss';
import { TrackPageDTO } from '@/services/track/types';
import { PlaylistDTO } from '@/services/playlist/types';
import { Button } from '../Button/Button';
import { Modal } from '../Modal';
import EditProfileModal from '@/components/ui/Modals/EditProfileModal';
import { Plan } from '@/components/ui/Cards/Plan';
import TrackTable from '@/components/ui/Tracks/TrackTable';

interface Props {
  avatarUrl: string;
  name: string;
  email?: string;
  stats: { followers: number; following: number };
  analytics?: { plays: number; followers: number };
  onEdit?: boolean;
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
    <>
      <EditProfileModal />
      <section className={styles.profile}>
        <div className={styles.cover}>
          <header className={styles.header}>
            <div className={styles.userInfo}>
              <img src={avatarUrl} alt={name} className={styles.avatar} />
              <div className={styles.details}>
                <h2>{name}</h2>
                {email && <p className={styles.email}>{email}</p>}
                {onEdit && (
                  <div className={styles.editProfile}>
                    <Modal.Trigger modal="editProfile">
                      <Button className={styles.editBtn} variant="ghost">
                        Editar perfil
                      </Button>
                    </Modal.Trigger>
                  </div>
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
                <Plan title="Plano Premium" />
              </div>
            )}
          </header>
        </div>

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
            {activeTab === 'Playlists' && (
              <TrackTable tracks={tracks.content} />
            )}
            {activeTab === 'Álbuns' && <TrackTable tracks={tracks.content} />}
            {activeTab === 'Artistas relacionados' && (
              <TrackTable tracks={tracks.content} />
            )}
          </div>
        )}
      </section>
    </>
  );
}
