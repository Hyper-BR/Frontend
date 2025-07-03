import { useState } from 'react';
import styles from './UploadModal.module.scss';
import { createRelease } from '../../../../src/services/release';
import { ReleaseDTO } from '../../../../src/services/release/types';

const UploadModal = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return alert('Envie um arquivo de áudio.');

    const release: any = {
      title,
      type: 'SINGLE',
      genre,
      file,
    };

    setLoading(true);
    try {
      await createRelease(release);
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
          <label>
            Nome da música
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
