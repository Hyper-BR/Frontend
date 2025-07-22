import { useEffect, useState } from 'react';
import styles from './Sidebar.module.scss';
import { getPlaylistsCustomer } from '@/services/playlist';
import { PlaylistDTO } from '@/services/playlist/types';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/commons/Button/Button';
import { Modal } from '@/components/commons/Modal';
import CreatePlaylistModal from '@/components/ui/Modals/CreatePlaylist/CreatePlaylistModal';
import { PlusIcon } from 'lucide-react';
import { PlaylistCard } from '@/components/ui/Playlist/PlaylistCard';

const Sidebar = () => {
  const [playlists, setPlaylists] = useState<PlaylistDTO[]>([]);

  const { userSigned } = useAuth();

  const fetchPlaylists = async () => {
    try {
      const response = await getPlaylistsCustomer();
      setPlaylists(response.data);
    } catch (error) {
      console.error('Erro ao buscar playlists:', error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  if (!userSigned) return;
  return (
    <>
      <CreatePlaylistModal />
      <aside className={styles.sidebar}>
        <Modal.Trigger modal="createPlaylist">
          <Button variant="ghost" icon={<PlusIcon size={15} />} className={styles.newPlaylistButton}>
            Nova Playlist
          </Button>
        </Modal.Trigger>

        {playlists.map((playlist) => (
          <PlaylistCard playlist={playlist} size="xs" enableHoverEffect />
        ))}
      </aside>
    </>
  );
};

export default Sidebar;
