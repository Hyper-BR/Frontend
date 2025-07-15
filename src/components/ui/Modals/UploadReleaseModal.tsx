import { useEffect, useState } from 'react';
import { Modal } from '@/components/commons/Modal';
import { TrackDTO } from '@/services/track/types';
import { useModal } from '@/contexts/ModalContext';
import { Input } from '@/components/commons/Input/Input';
import { Button } from '@/components/commons/Button/Button';
import styles from './UploadReleaseModal.module.scss';
import { Droppable } from '@/components/commons/Droppable/Droppable';
import { ArtistDTO } from '@/services/artist/types';
import { createRelease } from '@/services/release';
import { searchArtistsByName } from '@/services/artist';

const UploadReleaseModal = () => {
  const [loading, setLoading] = useState(false);
  const [showArtistSearch, setShowArtistSearch] = useState(false);
  const [searchArtistName, setSearchArtistName] = useState('');
  const [matchedArtists, setMatchedArtists] = useState<ArtistDTO[]>([]);

  const [form, setForm] = useState({
    title: '',
    genre: '',
    description: '',
    tags: [] as string[],
    privacy: 'PUBLIC',
    image: null as File | null,
    tracks: [] as TrackDTO[],
  });

  const { closeModal } = useModal();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('genre', form.genre);
      formData.append('privacy', form.privacy);
      formData.append('description', form.description);
      formData.append('tags', JSON.stringify(form.tags));

      if (form.image) {
        formData.append('cover', form.image);
      }

      form.tracks.forEach((track, i) => {
        formData.append(`tracks[${i}].title`, track.title);
        formData.append(`tracks[${i}].genre`, track.genre);
        formData.append(`tracks[${i}].tags`, JSON.stringify(track.tags));
        formData.append(`tracks[${i}].file`, track.file);
        formData.append(`tracks[${i}].artists`, JSON.stringify(track.artists));
      });
      console.log(formData);
      const response = await createRelease(formData);
      if (!response) throw new Error('Erro no envio');
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
    if (image) {
      setForm((prev) => ({ ...prev, image }));
    }
  };

  const getArtistByName = async (name: string) => {
    try {
      const response = await searchArtistsByName(name);
      setMatchedArtists(response.data);
    } catch (error) {
      console.error('Erro ao buscar artistas:', error);
    }
  };

  useEffect(() => {
    if (searchArtistName.length > 1) {
      getArtistByName(searchArtistName);
    } else {
      setMatchedArtists([]);
    }
  }, [searchArtistName]);

  return (
    <form onSubmit={handleSubmit}>
      <Modal.Root modal="upload" size="lg">
        <Modal.Header title="Upload de novas faixas" />

        <Modal.Content>
          <div className={styles.topSection}>
            <div className={styles.coverUpload}>
              <label className={styles.coverLabel}>
                <Droppable
                  label="Upload da capa"
                  onDrop={handleDrop}
                  shape="square"
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

              <Droppable
                label="Upload da track"
                onDrop={handleDrop}
                size="sm"
                shape="rectangle"
                accept="audio/*"
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

              {showArtistSearch && (
                <div className={styles.artistSearch}>
                  <Input
                    type="text"
                    value={searchArtistName}
                    onChange={(e) => setSearchArtistName(e.target.value)}
                    label="Buscar colaboradores"
                  />

                  {matchedArtists.length > 0 && (
                    <ul className={styles.artistList}>
                      {matchedArtists.map((artist) => (
                        <li key={artist.id}>
                          {artist.username}
                          <Button
                            variant="ghost"
                            onClick={() =>
                              setForm((prev) => ({
                                ...prev,
                                tracks: prev.tracks.map((t) => ({
                                  ...t,
                                  artists: [...(t.artists || []), artist],
                                })),
                              }))
                            }
                          >
                            + Adicionar
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <div className={styles.addArtistButton}>
                <Button
                  variant="ghost"
                  onClick={() => setShowArtistSearch(!showArtistSearch)}
                >
                  + Colaboradores
                </Button>
              </div>
            </div>
          </div>
        </Modal.Content>

        <Modal.Footer
          leftButton={
            <Button variant="ghost" onClick={() => alert('todo')}>
              + Adicionar faixa
            </Button>
          }
          cancelButton={
            <Button variant="ghost" onClick={closeModal}>
              Cancelar
            </Button>
          }
          submitButton={
            <Button type="submit" loading={loading}>
              Upload
            </Button>
          }
        />
      </Modal.Root>
    </form>
  );
};

export default UploadReleaseModal;
