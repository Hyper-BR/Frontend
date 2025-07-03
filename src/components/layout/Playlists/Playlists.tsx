import { useEffect, useState } from 'react';
import { PlaylistDTO } from '../../../../src/services/playlist/types';
import styles from './PlaylistList.module.scss';
import { Modal } from '../../commons/Modals/Modal';
import PlaylistModal from '../../commons/Modals/PlaylistModal/PlaylistModal';
import { getPlaylistsCustomer } from '../../../../src/services/playlist';

interface PlaylistListProps {
  onSelect: (playlist: PlaylistDTO) => void;
}

export const Playlists = ({ onSelect }: PlaylistListProps) => {
  const [showModal, setShowModal] = useState(false);
  const [playlists, setPlaylists] = useState<PlaylistDTO[]>([]);

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

  return (
    <>
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
            onClick={() => onSelect(playlist)}
          >
            <img
              src={playlist.image}
              alt={playlist.name}
              className={styles.cover}
            />
            <span className={styles.name}>{playlist.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};
