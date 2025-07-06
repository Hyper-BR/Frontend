import { useNavigate } from 'react-router-dom';
import { PlaylistDTO } from '@/services/playlist/types';
import { useAuth } from '@/hooks/useAuth';
import styles from './PlaylistToggleItem.module.scss';

interface Props {
  playlist: PlaylistDTO;
  trackId: string;
  isMember: boolean;
  onAdd: (trackId: string, playlistId: string) => Promise<void>;
  onRemove: (trackId: string, playlistId: string) => Promise<void>;
}

export default function PlaylistToggleItem({
  playlist,
  trackId,
  isMember,
  onAdd,
  onRemove,
}: Props) {
  const { userSigned } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!userSigned) {
      navigate('/login');
      return;
    }
    isMember
      ? await onRemove(trackId, playlist.id)
      : await onAdd(trackId, playlist.id);
  };

  return (
    <button
      className={`${styles.item} ${isMember ? styles.member : ''}`}
      onClick={handleClick}
    >
      <span className={styles.name}>{playlist.name}</span>
      <span className={styles.icon}>{isMember ? '✓' : '+'}</span>
    </button>
  );
}
