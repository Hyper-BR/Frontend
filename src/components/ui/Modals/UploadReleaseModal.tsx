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
import { ReleaseDTO } from '@/services/release/types';

const UploadReleaseModal = () => {
  const [loading, setLoading] = useState(false);
  const [showArtistSearch, setShowArtistSearch] = useState(false);
  const [searchArtistName, setSearchArtistName] = useState('');
  const [matchedArtists, setMatchedArtists] = useState<ArtistDTO[]>([]);

  const { closeModal } = useModal();

  const [form, setForm] = useState<ReleaseDTO>({
    description: '',
    cover: null,
    tracks: [
      {
        title: '',
        genre: '',
        tags: [],
        file: undefined as any,
        artists: [
          {
            id: '',
            username: '',
          },
        ],
        privacy: '',
      },
    ],
  });

  const handleTrackChange =
    (index: number, field: keyof TrackDTO) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setForm((prev) => {
        const updated = [...prev.tracks];
        updated[index] = { ...updated[index], [field]: value };
        return { ...prev, tracks: updated };
      });
    };

  const handleTrackFileDrop = (index: number) => (files: File[]) => {
    const audio = files[0];
    if (audio) {
      setForm((prev) => {
        const updated = [...prev.tracks];
        updated[index].file = audio;
        return { ...prev, tracks: updated };
      });
    }
  };

  const handleCoverDrop = (files: File[]) => {
    const image = files[0];
    if (image) {
      setForm((prev) => ({ ...prev, cover: image }));
    }
  };

  const handleAddTrack = () => {
    setForm((prev) => ({
      ...prev,
      tracks: [
        ...prev.tracks,
        {
          title: '',
          genre: '',
          tags: [],
          file: undefined as any,
          artists: [],
          privacy: '',
        },
      ],
    }));
  };

  const handleAddArtistToTrack = (artist: ArtistDTO, index: number) => {
    setForm((prev) => {
      const updated = [...prev.tracks];
      updated[index].artists = [...(updated[index].artists || []), artist];
      return { ...prev, tracks: updated };
    });
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

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('description', form.description);

      if (form.cover) {
        formData.append('cover', form.cover);
      }

      form.tracks.forEach((track, i) => {
        formData.append(`tracks[${i}].title`, track.title);
        formData.append(`tracks[${i}].genre`, track.genre);
        formData.append(`tracks[${i}].privacy`, track.privacy);
        formData.append(`tracks[${i}].tags`, JSON.stringify(track.tags));

        if (track.file) {
          formData.append(`tracks[${i}].file`, track.file);
        }

        track.artists
          .filter((artist) => artist.id)
          .forEach((artist, j) => {
            formData.append(`tracks[${i}].artists[${j}].id`, artist.id);
            formData.append(
              `tracks[${i}].artists[${j}].username`,
              artist.username,
            );
          });
      });

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

  return (
    <form onSubmit={handleSubmit}>
      <Modal.Root modal="upload" size="lg">
        <Modal.Header title="Upload de novas faixas" />

        <Modal.Content>
          <div className={styles.topSection}>
            <Droppable
              label="Upload da capa"
              onDrop={handleCoverDrop}
              shape="square"
              size="md"
              accept="image/*"
            />

            <div className={styles.metadata}>
              <Input
                type="text"
                value={form.description}
                onChange={handleChange('description')}
                label="Descrição do release"
              />

              {form.tracks.map((track, index) => (
                <div key={index} className={styles.trackFields}>
                  <Input
                    type="text"
                    value={track.title}
                    onChange={handleTrackChange(index, 'title')}
                    required
                    label={`Título da faixa ${index + 1}`}
                  />

                  <Input
                    type="text"
                    value={track.genre}
                    onChange={handleTrackChange(index, 'genre')}
                    label="Gênero"
                  />

                  <Input
                    type="text"
                    value={track.tags.join(', ')}
                    onChange={(e) =>
                      handleTrackChange(
                        index,
                        'tags',
                      )({
                        ...e,
                        target: {
                          ...e.target,
                          value: e.target.value
                            .split(',')
                            .map((tag) => tag.trim()),
                        },
                      } as unknown as React.ChangeEvent<HTMLInputElement>)
                    }
                    label="Tags (separadas por vírgula)"
                  />

                  <Droppable
                    label="Upload da track"
                    onDrop={handleTrackFileDrop(index)}
                    size="sm"
                    shape="rectangle"
                    accept="audio/*"
                  />

                  <div className={styles.privacy}>
                    <Input
                      type="radio"
                      value="PUBLIC"
                      checked={track.privacy === 'PUBLIC'}
                      onChange={() =>
                        handleTrackChange(
                          index,
                          'privacy',
                        )({
                          target: { value: 'PUBLIC' },
                        } as React.ChangeEvent<HTMLInputElement>)
                      }
                      label="Público"
                    />

                    <Input
                      type="radio"
                      value="PRIVATE"
                      checked={track.privacy === 'PRIVATE'}
                      onChange={() =>
                        handleTrackChange(
                          index,
                          'privacy',
                        )({
                          target: { value: 'PRIVATE' },
                        } as React.ChangeEvent<HTMLInputElement>)
                      }
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
                                  handleAddArtistToTrack(artist, index)
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
                </div>
              ))}

              <Button variant="ghost" onClick={handleAddTrack}>
                + Adicionar faixa
              </Button>

              <Button
                variant="ghost"
                onClick={() => setShowArtistSearch(!showArtistSearch)}
              >
                + Colaboradores
              </Button>
            </div>
          </div>
        </Modal.Content>

        <Modal.Footer
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
