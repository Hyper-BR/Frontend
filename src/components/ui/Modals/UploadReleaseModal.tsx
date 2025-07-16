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
import { Collapse } from '@/components/commons/Collapse/Collapse';
import clsx from 'clsx';

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

  // 1) upload inicial de áudio(s)
  const handleInitialUpload = (files: File[]) => {
    if (!files.length) return;
    const trackObjects: TrackDTO[] = files.map((file) => ({
      title: '',
      genre: '',
      tags: [''],
      file,
      artists: [
        {
          id: '0',
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

  // busca colaboradores por nome
  useEffect(() => {
    if (searchArtistName.length < 2) {
      setMatchedArtists([]);
      return;
    }
    searchArtistsByName(searchArtistName)
      .then((res) => setMatchedArtists(res.data))
      .catch(console.error);
  }, [searchArtistName]);

  // alterações genéricas no form
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

  // reset de estado + fechar modal
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

  // envio
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
      if (!res) throw new Error('Erro no envio');
      cleanAndClose();
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar. Tente novamente.');
    } finally {
      setLoading(false);
    }
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
            <div className={styles.topSection}>
              {/* ⬅️ Lado esquerdo: capa + release metadata + lista de faixas */}
              <div className={styles.leftColumn}>
                {releaseType === 'RELEASE' && (
                  <Droppable
                    label="Upload da capa"
                    onDrop={handleCoverDrop}
                    shape="square"
                    size="md"
                    accept="image/*"
                  />
                )}

                <Input
                  type="text"
                  label="Descrição do release"
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                />

                <div className={styles.trackList}>
                  {form.tracks.map((track, i) => (
                    <button
                      key={i}
                      type="button"
                      className={clsx(
                        styles.trackItem,
                        i === openTrackIndex && styles.active,
                      )}
                      onClick={() => setOpenTrackIndex(i)}
                    >
                      {track.title || `Faixa ${i + 1}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* ➡️ Lado direito: Formulário da faixa selecionada */}
              <div className={styles.rightColumn}>
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
                                handleAddArtistToTrack(artist, openTrackIndex)
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

                <Button
                  variant="ghost"
                  onClick={() => setShowArtistSearch(!showArtistSearch)}
                >
                  + Colaboradores
                </Button>
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
