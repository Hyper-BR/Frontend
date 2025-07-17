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
import TrackEditor from '@/components/commons/Tracks/TrackEditor';
import TrackList from '@/components/commons/Tracks/TrackList';

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

                <TrackList
                  tracks={form.tracks}
                  activeIndex={openTrackIndex}
                  onSelect={(i) => setOpenTrackIndex(i)}
                />
              </div>

              <div className={styles.colMain}>
                <TrackEditor
                  track={form.tracks[openTrackIndex]}
                  index={openTrackIndex}
                  onChange={(field, value) =>
                    setForm((prev) => {
                      const updated = [...prev.tracks];
                      updated[openTrackIndex] = {
                        ...updated[openTrackIndex],
                        [field]: value,
                      };
                      return { ...prev, tracks: updated };
                    })
                  }
                  onArtistRemove={(artistId) =>
                    setForm((prev) => {
                      const updated = [...prev.tracks];
                      updated[openTrackIndex].artists = updated[
                        openTrackIndex
                      ].artists.filter((a) => a.id !== artistId);
                      return { ...prev, tracks: updated };
                    })
                  }
                  onToggleSearch={() => setShowArtistSearch(!showArtistSearch)}
                  showArtistSearch={showArtistSearch}
                  matchedArtists={matchedArtists}
                  collaboratorOptions={collaboratorOptions}
                  onArtistSelect={(selected) =>
                    setForm((prev) => {
                      const updated = [...prev.tracks];
                      updated[openTrackIndex].artists = selected;
                      return { ...prev, tracks: updated };
                    })
                  }
                  searchArtistName={searchArtistName}
                  onSearchInput={(val) => setSearchArtistName(val)}
                />
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
