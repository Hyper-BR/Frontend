import { useState } from 'react';
import { Modal } from '@/components/commons/Modal';
import { TrackDTO } from '@/services/track/types';
import styles from './UploadRelease.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
}

const UploadRelease = ({ isOpen, onClose, onUploadSuccess }: Props) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState('PUBLIC');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [tracks, setTracks] = useState<TrackDTO[]>([]);
  const [showTrackForm, setShowTrackForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Enviando lançamento...');
      onUploadSuccess();
      onClose();
    } catch (err) {
      alert('Erro ao enviar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTrack = (index: number) => {
    setTracks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleStartNewTrack = () => {
    const newTrack: TrackDTO = {
      id: '',
      title: '',
      duration: 0,
      coverUrl: '',
      genre: '',
      file: null,
      artists: [],
    };

    setTracks((prev) => [...prev, newTrack]);
  };

  if (!isOpen) return null;

  return (
    <Modal.Root modal="upload" size="lg">
      <Modal.Header title="Upload de novas faixas" />

      <Modal.Content>
        <form onSubmit={handleSubmit}>
          <div className={styles.topSection}>
            <div className={styles.coverUpload}>
              <label className={styles.coverLabel}>
                {coverImage ? (
                  <img
                    src={URL.createObjectURL(coverImage)}
                    alt="Capa"
                    className={styles.coverPreview}
                  />
                ) : (
                  <span>🖼️ Capa do lançamento</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                  hidden
                />
              </label>
            </div>

            <div className={styles.metadata}>
              <label className={styles.label}>
                Título
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>

              <label className={styles.label}>
                Artista(s)
                <input
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                />
              </label>

              <label className={styles.label}>
                Gênero
                <input
                  type="text"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </label>

              <label className={styles.label}>
                Tags
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </label>

              <label className={styles.label}>
                Descrição
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>

              <div className={styles.privacy}>
                <p>Privacidade</p>
                <label>
                  <input
                    type="radio"
                    value="PUBLIC"
                    checked={privacy === 'PUBLIC'}
                    onChange={(e) => setPrivacy(e.target.value)}
                  />
                  Público
                </label>
                <label>
                  <input
                    type="radio"
                    value="UNLISTED"
                    checked={privacy === 'UNLISTED'}
                    onChange={(e) => setPrivacy(e.target.value)}
                  />
                  Não listado
                </label>
                <label>
                  <input
                    type="radio"
                    value="PRIVATE"
                    checked={privacy === 'PRIVATE'}
                    onChange={(e) => setPrivacy(e.target.value)}
                  />
                  Privado
                </label>
              </div>
            </div>
          </div>

          <div className={styles.trackBar}>
            {tracks.map((track, index) => (
              <div key={index} className={styles.trackItem}>
                <span>{track.title}</span>
                <button type="button" onClick={() => handleRemoveTrack(index)}>
                  Remover
                </button>
              </div>
            ))}
          </div>
        </form>
      </Modal.Content>

      <Modal.Footer
        leftButton={{
          label: '+ Adicionar faixa',
          onClick: handleStartNewTrack,
        }}
        cancelButton={{ label: 'Cancelar', onClick: onClose }}
        submitButton={{
          label: 'Upload',
          type: 'submit',
          loading,
          onClick: onClose,
        }}
      />
    </Modal.Root>
  );
};

export default UploadRelease;
