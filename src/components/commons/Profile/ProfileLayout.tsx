import { TrackDTO } from '@/services/track/types';
import { PlaylistDTO } from '@/services/playlist/types';
import TrackTable from '../Track/TrackTable';
import styles from './ProfileLayout.module.scss';

interface Props {
  avatarUrl: string;
  name: string;
  email?: string;
  stats: { followers: number; following: number };
  analytics?: { plays: number; followers: number };
  onEdit?: () => void;
  tracks: TrackDTO[];
  playlists: PlaylistDTO[];
}

export default function ProfileLayout({
  avatarUrl,
  name,
  email,
  stats,
  analytics,
  onEdit,
  tracks,
  playlists,
}: Props) {
  return (
    <section className={styles.profile}>
      <header className={styles.header}>
        <img src={avatarUrl} alt={name} className={styles.avatar} />
        <div>
          <h2>{name}</h2>
          {email && <p className={styles.email}>{email}</p>}
          {onEdit && <button onClick={onEdit}>Editar perfil</button>}
          {stats && (
            <div className={styles.stats}>
              <span>
                <strong>{stats.followers}</strong> seguidores
              </span>
              <span>
                <strong>{stats.following}</strong> seguindo
              </span>
            </div>
          )}
        </div>
      </header>

      {analytics && (
        <div className={styles.analytics}>
          <span>Reproduções: {analytics.plays}</span>
          <span>Seguidores: {analytics.followers}</span>
        </div>
      )}

      <h3>Faixas</h3>
      <TrackTable tracks={tracks} />
    </section>
  );
}
