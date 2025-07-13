import { useState } from 'react';
import { PlaylistDTO } from '@/services/playlist/types';
import { createPlaylist } from '@/services/playlist';
import styles from './CreatePlaylist.module.scss';
import { Button } from '../../Button/Button';
import { Modal } from '..';
import { useModal } from '@/contexts/ModalContext';

const CreatePlaylist = () => {
  const [name, setName] = useState('');

  const { closeModal } = useModal();

  const addNewPlaylist = async () => {
    try {
      if (!name.trim()) return;

      const playlist: PlaylistDTO = {
        id: null,
        name: name.trim(),
        description: 'Nova playlist',
        image: '',
      };

      await createPlaylist(playlist);
      setName('');
      closeModal;
    } catch (error) {
      console.error('Erro ao criar playlist:', error);
    }
  };

  return (
    <Modal.Root modal="createPlaylist" size="sm">
      <Modal.Header title="Nova Playlist" />

      <Modal.Content>
        <div className={styles.formContainer}>
          <input
            className={styles.input}
            type="text"
            placeholder="Digite o nome da playlist"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </Modal.Content>

      <Modal.Footer
        cancelButton={
          <Button variant="ghost" onClick={closeModal}>
            Cancelar
          </Button>
        }
        submitButton={
          <Button
            type="submit"
            onClick={addNewPlaylist}
            className={styles.submitButton}
            disabled={!name.trim()}
          >
            Criar
          </Button>
        }
      />
    </Modal.Root>
  );
};

export default CreatePlaylist;
