import { useEffect, useState } from 'react';
import { Modal } from '@/components/commons/Modal';
import { Droppable } from '@/components/commons/Droppable/Droppable';
import { Button } from '@/components/commons/Button/Button';
import TrackForm from '@/components/ui/Tracks/TrackForm';
import { useModal } from '@/contexts/ModalContext';
import { createRelease } from '@/services/release';
import { searchArtistsByName } from '@/services/artist';
import { ReleaseDTO } from '@/services/release/types';
import { ArtistDTO } from '@/services/artist/types';
import { TrackDTO } from '@/services/track/types';
import styles from './UploadReleaseModal.module.scss';
import TrackList from '../Tracks/TrackList';
import { Accordion } from '@/components/commons/Accordion';

const UploadReleaseModal = () => {
  const { closeModal } = useModal();

  const [loading, setLoading] = useState(false);
  const [uploadStarted, setUploadStarted] = useState(false);
  const [releaseType, setReleaseType] = useState<'SINGLE' | 'RELEASE' | null>(
    'RELEASE',
  );
  const [activePanel, setActivePanel] = useState<'tracks' | 'configs' | null>(
    'tracks',
  );
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);

  const [artistSearch, setArtistSearch] = useState({
    name: '',
    matched: [] as ArtistDTO[],
    visible: false,
  });

  const [form, setForm] = useState<ReleaseDTO>({
    description: '',
    cover: null,
    tracks: [],
  });

  const collaboratorOptions = artistSearch.matched.map((artist) => ({
    value: artist.id,
    label: artist.username,
  }));

  const handleUploadTracks = (files: File[]) => {
    if (!files.length) return;
    const tracks = files.map(
      (file): TrackDTO => ({
        title: '',
        genre: '',
        tags: [],
        file,
        artists: [],
        privacy: 'PUBLIC',
      }),
    );

    setForm((prev) => ({ ...prev, tracks }));
    setSelectedTrackIndex(0);
    setUploadStarted(true);
    setReleaseType(files.length === 1 ? 'SINGLE' : 'RELEASE');
  };

  const handleUploadCover = (files: File[]) => {
    const image = files[0];
    if (image) {
      setForm((prev) => ({ ...prev, cover: image }));
    }
  };

  const resetAndClose = () => {
    setUploadStarted(false);
    setReleaseType(null);
    setForm({ description: '', cover: null, tracks: [] });
    setSelectedTrackIndex(-1);
    setArtistSearch({ name: '', matched: [], visible: false });
    closeModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('description', form.description);
      if (form.cover) data.append('cover', form.cover);

      form.tracks.forEach((track, i) => {
        data.append(`tracks[${i}].title`, track.title);
        data.append(`tracks[${i}].genre`, track.genre);
        data.append(`tracks[${i}].privacy`, track.privacy);
        data.append(`tracks[${i}].tags`, JSON.stringify(track.tags));
        if (track.file) data.append(`tracks[${i}].file`, track.file);

        track.artists.forEach((artist, j) => {
          data.append(`tracks[${i}].artists[${j}].id`, artist.id);
          data.append(`tracks[${i}].artists[${j}].username`, artist.username);
        });
      });

      const res = await createRelease(data);
      if (!res) throw new Error('Erro no envio');
      resetAndClose();
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (artistSearch.name.length >= 2) {
        searchArtistsByName(artistSearch.name)
          .then((res) =>
            setArtistSearch((prev) => ({
              ...prev,
              matched: res.data.content,
            })),
          )
          .catch((err) => console.error('Erro ao buscar artistas:', err));
      } else {
        setArtistSearch((prev) => ({ ...prev, matched: [] }));
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [artistSearch.name]);

  return (
    <form onSubmit={handleSubmit}>
      <Modal.Root modal="upload" size="lg" onClose={resetAndClose}>
        <Modal.Header
          title={
            releaseType === 'SINGLE'
              ? 'Upload de Faixa'
              : releaseType === 'RELEASE'
              ? 'Upload de EP / Álbum'
              : 'Upload de Release'
          }
        />

        <Modal.Content>
          {!uploadStarted && (
            <div className={styles.initialDrop}>
              <Droppable
                label="Arraste ou clique para enviar suas faixas"
                onDrop={handleUploadTracks}
                shape="rectangle"
                size="xl"
                accept="audio/*"
                multiple
              />
            </div>
          )}

          {uploadStarted && (
            <div className={styles.columns}>
              <div className={styles.cover}>
                <Droppable
                  label="Upload da capa"
                  onDrop={handleUploadCover}
                  shape="square"
                  size="xl"
                  accept="image/*"
                  file={form.cover}
                />
              </div>

              <div className={styles.form}>
                <TrackForm
                  track={form.tracks[selectedTrackIndex]}
                  onChange={(field, value) =>
                    setForm((prev) => {
                      const updated = [...prev.tracks];
                      updated[selectedTrackIndex] = {
                        ...updated[selectedTrackIndex],
                        [field]: value,
                      };
                      return { ...prev, tracks: updated };
                    })
                  }
                  matchedArtists={artistSearch.matched}
                  collaboratorOptions={collaboratorOptions}
                  onArtistSelect={(selected) =>
                    setForm((prev) => {
                      const updated = [...prev.tracks];
                      updated[selectedTrackIndex].artists = selected;
                      return { ...prev, tracks: updated };
                    })
                  }
                  searchArtistName={artistSearch.name}
                  onSearchInput={(name) =>
                    setArtistSearch((prev) => ({ ...prev, name }))
                  }
                />
              </div>

              <div className={styles.accordion}>
                <Accordion.Root>
                  <Accordion.Item
                    id="tracks"
                    activeId={activePanel}
                    setActiveId={() => setActivePanel('tracks')}
                    title="Faixas"
                  >
                    <TrackList
                      tracks={form.tracks}
                      activeIndex={selectedTrackIndex}
                      onSelect={(i) => setSelectedTrackIndex(i)}
                    />
                  </Accordion.Item>

                  <Accordion.Item
                    id="configs"
                    activeId={activePanel}
                    setActiveId={() => setActivePanel('configs')}
                    title="Configurações Avançadas"
                  >
                    <div className={styles.configs}>
                      <label>Descrição</label>
                    </div>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
            </div>
          )}
        </Modal.Content>

        {uploadStarted && (
          <Modal.Footer
            cancelButton={
              <Button variant="ghost" onClick={resetAndClose}>
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
