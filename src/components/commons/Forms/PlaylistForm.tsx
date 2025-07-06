import { useState } from 'react';
import { PlaylistDTO } from '@/services/playlist/types';
import { createPlaylist } from '@/services/playlist';
import styles from './PlaylistForm.module.scss';

interface PlaylistModalProps {
  onClose: () => void;
  onCreate: () => void;
}

const PlaylistModal = ({ onClose, onCreate }: PlaylistModalProps) => {
  const [name, setName] = useState('');

  const addNewPlaylist = async () => {
    try {
      if (!name.trim()) return;

      const playlist: PlaylistDTO = {
        id: null,
        name: name.trim(),
        description: 'Nova playlist',
        image: '',
        tracks: [],
      };

      await createPlaylist(playlist);
      setName('');
      onClose();
      onCreate();
    } catch (error) {
      console.error('Erro ao criar playlist:', error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Nova Playlist</h2>
      <input
        className={styles.input}
        type="text"
        placeholder="Digite o nome da playlist"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className={styles.submitButton}
        onClick={addNewPlaylist}
        disabled={!name.trim()}
      >
        Criar
      </button>
    </div>
  );
};

export default PlaylistModal;
