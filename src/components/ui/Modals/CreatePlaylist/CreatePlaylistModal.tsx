import { useState } from 'react';
import { PlaylistDTO } from '@/services/playlist/types';
import { createPlaylist } from '@/services/playlist';
import { useModal } from '@/contexts/ModalContext';
import { Modal } from '@/components/commons/Modal';
import { Input } from '@/components/commons/Input/Input';
import { Button } from '@/components/commons/Button/Button';
import styles from './CreatePlaylistModal.module.scss';
import { useNavigate } from 'react-router-dom';

const CreatePlaylistModal = () => {
  const [name, setName] = useState('');

  const { closeModal } = useModal();
  const navigate = useNavigate();

  const addNewPlaylist = async () => {
    try {
      if (!name.trim()) return;

      const playlist: PlaylistDTO = {
        id: null,
        name: name.trim(),
        description: 'Nova playlist',
        coverUrl: '',
      };

      await createPlaylist(playlist);
      setName('');
      closeModal();
      navigate(0);
    } catch (error) {
      console.error('Erro ao criar playlist:', error);
    }
  };

  return (
    <Modal.Root modal="createPlaylist" size="sm" onClose={closeModal}>
      <Modal.Header title="Nova Playlist" />

      <Modal.Content>
        <div className={styles.formContainer}>
          <Input
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
          <Button type="submit" onClick={addNewPlaylist} className={styles.submitButton} disabled={!name.trim()}>
            Criar
          </Button>
        }
      />
    </Modal.Root>
  );
};

export default CreatePlaylistModal;
