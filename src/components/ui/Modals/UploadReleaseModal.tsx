import { useEffect, useState } from 'react';
import { Modal } from '@/components/commons/Modal';
import { TrackDTO } from '@/services/track/types';
import { useModal } from '@/contexts/ModalContext';
import { Input } from '@/components/commons/Input/Input';
import { Button } from '@/components/commons/Button/Button';
import styles from './UploadReleaseModal.module.scss';
import { Droppable } from '@/components/commons/Droppable/Droppable';
import { ArtistDTO } from '@/services/artist/types';

const UploadReleaseModal = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<ArtistDTO[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<ArtistDTO[]>([]);

  const [form, setForm] = useState<TrackDTO>({
    id: null,
    title: '',
    artists: [],
    genre: '',
    tags: [],
    description: '',
    privacy: '',
    cover: '',
    file: null,
  });

  const { closeModal } = useModal();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('title', form.title);
      formData.append('genre', form.genre);
      formData.append('description', form.description);
      formData.append('privacy', form.privacy);
      formData.append('tags', JSON.stringify(form.tags));

      formData.append('artists', JSON.stringify(form.artists));

      if (form.file) formData.append('file', form.file);
      if (form.cover) formData.append('cover', form.cover);

      const response = await fetch('/api/releases', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Erro no envio');
      closeModal();
    } catch (err) {
      alert('Erro ao enviar. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleDrop = (files: File[]) => {
    const image = files[0];
    if (image) setForm((prev) => ({ ...prev }));
  };

  const fetchArtists = (query: string) => {
    console.log('retornar artista: ' + query);
  };

  useEffect(() => {
    if (query.length > 1) {
      fetchArtists(query);
    }
  }, [query]);

  return (
    <Modal.Root modal="upload" size="lg">
      <Modal.Header title="Upload de novas faixas" />

      <Modal.Content>
        <form onSubmit={handleSubmit}>
          <div className={styles.topSection}>
            <div className={styles.coverUpload}>
              <label className={styles.coverLabel}>
                <Droppable
                  label="Upload da capa"
                  onDrop={handleDrop}
                  shape="round"
                  size="md"
                  accept="image/*"
                />
              </label>
            </div>

            <div className={styles.metadata}>
              <Input
                type="text"
                value={form.title}
                onChange={handleChange('title')}
                required
                label="Título"
              />

              <Input
                type="text"
                value={'TODO'}
                onChange={handleChange('artists')}
                label="Colaboradores"
              />

              <Input
                type="text"
                value={form.genre}
                onChange={handleChange('genre')}
                label="Gênero"
              />

              <Input
                type="text"
                value={form.tags}
                onChange={handleChange('tags')}
                label="Tags"
              />

              <Input
                type="text"
                value={form.description}
                onChange={handleChange('description')}
                label="Descrição"
              />

              <div className={styles.privacy}>
                <Input
                  type="radio"
                  value="PUBLIC"
                  checked={form.privacy === 'PUBLIC'}
                  onChange={handleChange('privacy')}
                  label="Público"
                />

                <Input
                  type="radio"
                  value="PRIVATE"
                  checked={form.privacy === 'PRIVATE'}
                  onChange={handleChange('privacy')}
                  label="Privado"
                />
              </div>
            </div>
          </div>
        </form>
      </Modal.Content>

      <Modal.Footer
        leftButton={
          <Button variant="ghost" onClick={() => handleSubmit}>
            + Adicionar faixa
          </Button>
        }
        cancelButton={
          <Button variant="ghost" onClick={closeModal}>
            Cancelar
          </Button>
        }
        submitButton={
          <Button type="submit" loading={loading} onClick={closeModal}>
            Upload
          </Button>
        }
      />
    </Modal.Root>
  );
};

export default UploadReleaseModal;
