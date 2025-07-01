import { useState } from 'react';
import { saveTracks } from '../../../../src/services/track';
import styles from './UploadModal.module.scss';
import { useAuth } from '../../../../src/hooks/useAuth';

const UploadModal = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return alert('Envie um arquivo de áudio.');
    if (!selectedArtistId) return alert('Selecione o artista responsável.');

    const track = {
      name: name,
      image: image,
      genre: genre,
      file: file,
    };

    setLoading(true);
    try {
      console.log(track);
      await saveTracks(track, selectedArtistId.toString());
      alert('Faixa enviada com sucesso!');
      onClose();
    } catch (err) {
      console.error('Erro ao fazer upload:', err);
      alert('Erro ao enviar faixa. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>
          ×
        </button>
        <h2>Upload de nova faixa</h2>
        <form onSubmit={handleSubmit}>
          {user.artistProfiles.length > 0 && (
            <label>
              Projeto artista
              <select
                value={selectedArtistId ?? ''}
                onChange={(e) => setSelectedArtistId(Number(e.target.value))}
                required
              >
                <option value="">Selecione</option>
                {user.artistProfiles.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.username}
                  </option>
                ))}
              </select>
            </label>
          )}

          <label>
            Nome da música
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Gênero
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              <option value="ROCK">Rock</option>
              <option value="POP">Pop</option>
              <option value="HIPHOP">Hip-Hop</option>
              <option value="MPB">MPB</option>
              <option value="ELETRONICA">Eletrônica</option>
            </select>
          </label>

          <label>
            Capa da faixa (URL)
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
            />
          </label>

          <label className={styles.uploadArea}>
            🎵 Clique ou arraste o áudio aqui
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              hidden
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar faixa'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
