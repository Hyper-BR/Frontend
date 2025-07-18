import { useEffect, useState } from 'react';
import { useModal } from '@/contexts/ModalContext';
import { createRelease } from '@/services/release';
import { searchArtistsByName } from '@/services/artist';
import { ReleaseDTO } from '@/services/release/types';
import { TrackDTO } from '@/services/track/types';
import { ArtistDTO } from '@/services/artist/types';

export const useUploadRelease = () => {
  const { closeModal } = useModal();

  const [loading, setLoading] = useState(false);
  const [uploadStarted, setUploadStarted] = useState(false);
  const [releaseType, setReleaseType] = useState<
    'SINGLE' | 'EP' | 'ALBUM' | null
  >('EP');
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
    type: releaseType,
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
        type: releaseType,
      }),
    );

    setForm((prev) => ({ ...prev, tracks }));
    setSelectedTrackIndex(0);
    setUploadStarted(true);
    setReleaseType(files.length === 1 ? 'SINGLE' : 'EP');
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
    setForm({ description: '', cover: null, tracks: [], type: null });
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
      data.append('type', releaseType ?? 'SINGLE');
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

  return {
    loading,
    uploadStarted,
    releaseType,
    activePanel,
    setActivePanel,
    selectedTrackIndex,
    setSelectedTrackIndex,
    artistSearch,
    setArtistSearch,
    collaboratorOptions,
    form,
    setForm,
    handleUploadTracks,
    handleUploadCover,
    handleSubmit,
    resetAndClose,
  };
};
