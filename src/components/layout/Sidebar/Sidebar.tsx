import { useEffect, useState } from 'react';
import styles from './Sidebar.module.scss';
import { addTrackToPlaylist, getPlaylistsCustomer } from '@/services/playlist';
import { PlaylistDTO } from '@/services/playlist/types';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/commons/Button/Button';
import { Modal } from '@/components/commons/Modal';
import CreatePlaylistModal from '@/components/ui/Modals/CreatePlaylistModal';

const Sidebar = () => {
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
    <>
      <CreatePlaylistModal />
      <aside className={styles.sidebar}>
        <div className={styles.playlistList}>
          <Modal.Trigger modal="createPlaylist">
            <Button variant="ghost">Nova Playlist</Button>
          </Modal.Trigger>

          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className={`${styles.item} ${
                hoveredPlaylistId === playlist.id
                  ? styles['droppable-hover']
                  : ''
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
                src={playlist.coverUrl}
                alt={playlist.name}
                className={styles.cover}
              />
              <span className={styles.name}>{playlist.name}</span>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
