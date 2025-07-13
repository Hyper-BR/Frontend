import { useState } from 'react';
import styles from './UploadReleaseForm.module.scss';
import { createRelease } from '@/services/release';

interface UploadReleaseFormProps {
  onClose: () => void;
  onUploadSuccess: () => void;
}

type Track = {
  title: string;
  file: File;
  cover?: File;
};

const UploadReleaseForm = ({
  onClose,
  onUploadSuccess,
}: UploadReleaseFormProps) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState('PUBLIC');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [showTrackForm, setShowTrackForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddTrack = (file: File) => {
    const newTrack: Track = {
      title: file.name.replace(/\.[^/.]+$/, ''),
      file,
    };
    setTracks((prev) => [...prev, newTrack]);
    setShowTrackForm(false);
  };

  const handleRemoveTrack = (index: number) => {
    setTracks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tracks.length) return alert('Adicione ao menos uma faixa.');

    const release = {
      title,
      artist,
      genre,
      tags: tags.split(',').map((tag) => tag.trim()),
      description,
      privacy,
      type: 'SINGLE',
      coverImage,
      tracks,
    };

    setLoading(true);
    try {
      await createRelease(release);
      onUploadSuccess();
      onClose();
    } catch (err) {
      console.error('Erro ao enviar:', err);
      alert('Falha ao enviar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.uploadForm}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {!showTrackForm && (
          <>
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
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
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
                  <button
                    type="button"
                    onClick={() => handleRemoveTrack(index)}
                  >
                    Remover
                  </button>
                </div>
              ))}
              <button
                type="button"
                className={styles.addTrackButton}
                onClick={() => setShowTrackForm(true)}
              >
                + Adicionar faixa
              </button>
            </div>

            <div className={styles.footerActions}>
              <button
                type="button"
                className={styles.cancelGhost}
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className={styles.uploadButton}
              >
                {loading ? 'Enviando...' : 'Upload'}
              </button>
            </div>
          </>
        )}

        {showTrackForm && (
          <div className={styles.trackForm}>
            <label className={styles.label}>
              Faixa
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected) handleAddTrack(selected);
                }}
              />
            </label>
            <button type="button" onClick={() => setShowTrackForm(false)}>
              Cancelar
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadReleaseForm;
