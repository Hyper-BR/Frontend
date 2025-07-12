import { useEffect, useState } from 'react';
import styles from './Sidebar.module.scss';
import { addTrackToPlaylist, getPlaylistsCustomer } from '@/services/playlist';
import { PlaylistDTO } from '@/services/playlist/types';
import PlaylistModal from '../../commons/Forms/PlaylistForm';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const [playlists, setPlaylists] = useState<PlaylistDTO[]>([]);
  const [hoveredPlaylistId, setHoveredPlaylistId] = useState<string | null>(
    null,
  );

  const { userSigned } = useAuth();
  const navigate = useNavigate();

  const fetchPlaylists = async () => {
    try {
      const response = await getPlaylistsCustomer();
      setPlaylists(response.data);
    } catch (error) {
      console.error('Erro ao buscar playlists:', error);
    }
  };

  const handleAddToPlaylist = async (trackId: string, playlistId: string) => {
    await addTrackToPlaylist(playlistId, trackId);
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  if (!userSigned) return;
  return (
    <aside className={styles.sidebar}>
      {showModal && (
        <></>
        // <Modal isOpen={true} onClose={() => setShowModal(false)}>
        //   <PlaylistModal
        //     onClose={() => setShowModal(false)}
        //     onCreate={fetchPlaylists}
        //   />
        // </Modal>
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
            className={`${styles.item} ${
              hoveredPlaylistId === playlist.id ? styles['droppable-hover'] : ''
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setHoveredPlaylistId(playlist.id);
            }}
            onDragLeave={() => setHoveredPlaylistId(null)}
            onDrop={(e) => {
              const trackId = e.dataTransfer.getData('text/plain');
              handleAddToPlaylist(trackId, playlist.id);
              setHoveredPlaylistId(null);
            }}
            onClick={() => navigate(`/playlist/${playlist.id}`)}
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
