import { TrackDTO } from '@/services/track/types';
import { PlaylistDTO } from '@/services/playlist/types';
import TrackTable from '../Track/TrackTable';
import { CustomerDTO } from '@/services/customer/types';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import styles from './UserProfile.module.scss';

interface Props {
  user: CustomerDTO;
  tracks: TrackDTO[];
  playlists: PlaylistDTO[];
  isOwner: boolean;
  analytics?: { plays: number; followers: number };
  onEditProfile?: () => void;
  handleAddToPlaylist: (trackId: string, playlistId: string) => void;
}

export default function UserProfile({
  user,
  tracks,
  playlists,
  isOwner,
  analytics,
  onEditProfile,
}: Props) {
  const { customer } = useAuth();

  useEffect(() => {
    // fetchTracks();
  }, []);

  return (
    <section className={styles.profile}>
      <header className={styles.header}>
        <img
          src={'https://i.pravatar.cc/40?u='}
          alt={user.name}
          className={styles.avatar}
        />
        <div>
          <h2>{user.name}</h2>
          {isOwner && onEditProfile && (
            <>
              <button onClick={onEditProfile}>Editar perfil</button>
              <p>{customer?.email}</p>
            </>
          )}
          <div className={styles.stats}>
            <span>
              <strong>120</strong> seguidores
            </span>
            <span>
              <strong>87</strong> seguindo
            </span>
          </div>
        </div>
      </header>

      {isOwner && analytics && (
        <div className="analytics">
          <span>Reproduções: {analytics.plays}</span>
          <span>Seguidores: {analytics.followers}</span>
        </div>
      )}

      <h3>Faixas</h3>
      {tracks.length > 0 ? (
        <TrackTable tracks={tracks} />
      ) : (
        'Nada de tracks aqui'
      )}
    </section>
  );
}
