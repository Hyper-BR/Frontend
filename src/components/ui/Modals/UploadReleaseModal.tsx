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
import clsx from 'clsx';
import Select from 'react-select';

const UploadReleaseModal = () => {
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(false);
  const [initialUploadDone, setInitialUploadDone] = useState(false);
  const [releaseType, setReleaseType] = useState<'SINGLE' | 'RELEASE' | null>(
    null,
  );
  const [openTrackIndex, setOpenTrackIndex] = useState<number>(-1);
  const [searchArtistName, setSearchArtistName] = useState('');
  const [matchedArtists, setMatchedArtists] = useState<ArtistDTO[]>([]);
  const [showArtistSearch, setShowArtistSearch] = useState(false);

  const [form, setForm] = useState<ReleaseDTO>({
    description: '',
    cover: null,
    tracks: [],
  });

  const collaboratorOptions = Array.isArray(matchedArtists)
    ? matchedArtists.map((artist) => ({
        value: artist.id,
        label: artist.username,
      }))
    : [];

  const selectedArtist =
    collaboratorOptions.find((opt) => opt.label === searchArtistName) || null;

  const handleInitialUpload = (files: File[]) => {
    if (!files.length) return;
    const trackObjects: TrackDTO[] = files.map((file) => ({
      title: '',
      genre: '',
      tags: [''],
      file,
      artists: [
        {
          id: '',
          username: '',
        },
      ],
      privacy: 'PUBLIC',
    }));

    setForm((prev) => ({ ...prev, tracks: trackObjects }));
    setOpenTrackIndex(0);
    setInitialUploadDone(true);
    setReleaseType(files.length === 1 ? 'SINGLE' : 'RELEASE');
  };

  const handleCoverDrop = (files: File[]) => {
    const img = files[0];
    if (img) setForm((prev) => ({ ...prev, cover: img }));
  };

  const handleAddArtistToTrack = (artist: ArtistDTO, index: number) =>
    setForm((prev) => {
      const tracks = [...prev.tracks];
      tracks[index].artists = [...(tracks[index].artists || []), artist];
      return { ...prev, tracks };
    });

  const cleanAndClose = () => {
    setInitialUploadDone(false);
    setReleaseType(null);
    setForm({ description: '', cover: null, tracks: [] });
    setOpenTrackIndex(-1);
    setSearchArtistName('');
    setMatchedArtists([]);
    setShowArtistSearch(false);
    closeModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append('description', form.description);
      if (form.cover) data.append('cover', form.cover);

      form.tracks.forEach((t, i) => {
        data.append(`tracks[${i}].title`, t.title);
        data.append(`tracks[${i}].genre`, t.genre);
        data.append(`tracks[${i}].privacy`, t.privacy);
        data.append(`tracks[${i}].tags`, JSON.stringify(t.tags));
        if (t.file) data.append(`tracks[${i}].file`, t.file);
        t.artists.forEach((a, j) => {
          data.append(`tracks[${i}].artists[${j}].id`, a.id);
          data.append(`tracks[${i}].artists[${j}].username`, a.username);
        });
      });

      const res = await createRelease(data);
      console.log('Release created:', res);
      if (!res) throw new Error('Erro no envio');
      cleanAndClose();
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const fetchArtists = async () => {
    try {
      const res = await searchArtistsByName(searchArtistName);
      setMatchedArtists(res.data.content);
    } catch (error) {
      console.error('Erro ao buscar artistas:', error);
    }
  };

  useEffect(() => {
    if (searchArtistName.length < 2) {
      setMatchedArtists([]);
      return;
    }
    fetchArtists();
  }, [searchArtistName]);

  const handleTrackChange =
    (index: number, field: keyof TrackDTO) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setForm((prev) => {
        const tracks = [...prev.tracks];
        tracks[index] = { ...tracks[index], [field]: value };
        return { ...prev, tracks };
      });
    };

  return (
    <form onSubmit={handleSubmit}>
      <Modal.Root modal="upload" size="lg" onClose={cleanAndClose}>
        <Modal.Header
          title={
            releaseType
              ? releaseType === 'SINGLE'
                ? 'Upload de Faixa'
                : 'Upload de EP / Álbum'
              : 'Upload de Release'
          }
        />

        <Modal.Content>
          {!initialUploadDone && (
            <div className={styles.initialDrop}>
              <Droppable
                label="Arraste ou clique para enviar suas faixas"
                onDrop={handleInitialUpload}
                shape="rectangle"
                size="xl"
                accept="audio/*"
                multiple
              />
            </div>
          )}

          {initialUploadDone && (
            <div className={styles.columns2}>
              <div className={styles.colSidebar}>
                <Droppable
                  label="Upload da capa"
                  onDrop={handleCoverDrop}
                  shape="square"
                  size="xl"
                  accept="image/*"
                  file={form.cover}
                />

                <h3 className={styles.trackColumnTitle}>Faixas enviadas</h3>
                <ul className={styles.trackColumnList}>
                  {form.tracks.map((track, i) => (
                    <li
                      key={i}
                      className={clsx(
                        styles.trackColumnItem,
                        i === openTrackIndex && styles.active,
                      )}
                      onClick={() => setOpenTrackIndex(i)}
                    >
                      {track.title?.trim() !== ''
                        ? track.title
                        : track.file?.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.colMain}>
                <Input
                  type="text"
                  label="Título da faixa"
                  value={form.tracks[openTrackIndex].title}
                  required
                  onChange={handleTrackChange(openTrackIndex, 'title')}
                />

                <Input
                  type="text"
                  label="Gênero"
                  value={form.tracks[openTrackIndex].genre}
                  onChange={handleTrackChange(openTrackIndex, 'genre')}
                />

                <Input
                  type="text"
                  label="Tags (separadas por vírgula)"
                  value={form.tracks[openTrackIndex].tags.join(', ')}
                  onChange={(e) =>
                    handleTrackChange(
                      openTrackIndex,
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
                />

                <div className={styles.privacy}>
                  Privacidade
                  <Input
                    type="radio"
                    value="PUBLIC"
                    checked={form.tracks[openTrackIndex].privacy === 'PUBLIC'}
                    onChange={() =>
                      handleTrackChange(
                        openTrackIndex,
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
                    checked={form.tracks[openTrackIndex].privacy === 'PRIVATE'}
                    onChange={() =>
                      handleTrackChange(
                        openTrackIndex,
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
                    <Select
                      value={form.tracks[openTrackIndex].artists.map(
                        (artist) => ({
                          value: artist.id,
                          label: artist.username,
                        }),
                      )}
                      inputValue={searchArtistName}
                      onInputChange={(input) => setSearchArtistName(input)}
                      onChange={(selectedOptions) => {
                        const selectedArtists = selectedOptions
                          .map((option) =>
                            matchedArtists.find((a) => a.id === option.value),
                          )
                          .filter(Boolean);

                        setForm((prev) => {
                          const updatedTracks = [...prev.tracks];
                          updatedTracks[openTrackIndex].artists =
                            selectedArtists as ArtistDTO[];
                          return { ...prev, tracks: updatedTracks };
                        });

                        setSearchArtistName('');
                      }}
                      options={collaboratorOptions}
                      placeholder="Buscar colaboradores..."
                      noOptionsMessage={() =>
                        searchArtistName.length < 2
                          ? 'Digite pelo menos 2 letras'
                          : 'Nenhum artista encontrado'
                      }
                      isMulti
                      isClearable
                      isSearchable
                      classNamePrefix="react-select"
                    />
                  </div>
                )}

                <Button
                  variant="ghost"
                  onClick={() => setShowArtistSearch(!showArtistSearch)}
                >
                  + Colaboradores
                </Button>
                <ul className={styles.artistListInline}>
                  {form.tracks[openTrackIndex].artists.map((a) => (
                    <li key={a.id}>
                      {a.username}
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setForm((prev) => {
                            const updatedTracks = [...prev.tracks];
                            updatedTracks[openTrackIndex].artists =
                              updatedTracks[openTrackIndex].artists.filter(
                                (artist) => artist.id !== a.id,
                              );
                            return { ...prev, tracks: updatedTracks };
                          });
                        }}
                      >
                        ✖
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Modal.Content>

        {initialUploadDone && (
          <Modal.Footer
            cancelButton={
              <Button variant="ghost" onClick={cleanAndClose}>
                Cancelar
              </Button>
            }
            submitButton={
              <Button type="submit" loading={loading}>
                Upload
              </Button>
            }
          />
        )}
      </Modal.Root>
    </form>
  );
};

export default UploadReleaseModal;
