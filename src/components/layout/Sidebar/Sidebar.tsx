import { useEffect, useState } from 'react';
import styles from './Sidebar.module.scss';
import { getPlaylistsCustomer } from '@/services/playlist';
import { PlaylistDTO } from '@/services/playlist/types';
import PlaylistModal from '../../commons/Forms/PlaylistForm';
import { Modal } from '../../commons/Modal/Modal';
import { useAuth } from '@/hooks/useAuth';

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
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
    <aside className={styles.sidebar}>
      {showModal && (
        <Modal isOpen={true} onClose={() => setShowModal(false)}>
          <PlaylistModal
            onClose={() => setShowModal(false)}
            onCreate={fetchPlaylists}
          />
        </Modal>
      )}
      <div className={styles.playlistList}>
        <button
          className={styles.addPlaylistButton}
          onClick={() => setShowModal(true)}
        >
          ➕ Nova Playlist
        </button>

        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className={styles.item}
            onClick={() => alert(playlist)}
          >
            <img
              src={'https://i.pravatar.cc/150?u='}
              alt={playlist.name}
              className={styles.cover}
            />
            <span className={styles.name}>{playlist.name}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
