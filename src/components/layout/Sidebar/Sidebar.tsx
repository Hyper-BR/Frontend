import { useEffect, useState } from 'react';
import styles from './Sidebar.module.scss';
import { addTrackToPlaylist, getPlaylistsCustomer } from '@/services/playlist';
import { PlaylistDTO } from '@/services/playlist/types';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/commons/Button/Button';
import { Modal } from '@/components/commons/Modal';
import CreatePlaylistModal from '@/components/ui/Modals/CreatePlaylist/CreatePlaylistModal';
import { PlusIcon } from 'lucide-react';
import { PlaylistCard } from '@/components/ui/Playlist/PlaylistCard';
import { useDragDrop } from '@/contexts/DragDropProvider';

const Sidebar = () => {
  const [playlists, setPlaylists] = useState<PlaylistDTO[]>([]);
  const { userSigned } = useAuth();
  const { setDropHandler } = useDragDrop();

  const fetchPlaylists = async () => {
    try {
      const response = await getPlaylistsCustomer();
      setPlaylists(response.data);
    } catch (error) {
      console.error('Erro ao buscar playlists:', error);
    }
  };

  const addTrackInPlaylist = async (trackId: string, playlistId: string) => {
    try {
      console.log(trackId);
      console.log(playlistId);
      await addTrackToPlaylist(trackId, playlistId);
    } catch (error) {
      console.error('Erro ao adicionar track na playlist:', error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  useEffect(() => {
    setDropHandler((trackId, playlistId) => {
      const playlist = playlists.find((p) => p.id === playlistId);
      if (!playlist) return;

      const isAlreadyAdded = playlist.tracks?.some((t) => t.id === trackId);

      if (isAlreadyAdded) {
        alert('track ja está na playlist');
        return;
      }

      addTrackInPlaylist(playlist.id, trackId);
    });
  }, [playlists]);

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
          <PlaylistCard key={playlist.id} playlist={playlist} size="xs" enableHoverEffect />
        ))}
      </aside>
    </>
  );
};

export default Sidebar;
