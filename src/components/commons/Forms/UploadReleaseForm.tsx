import { useState } from 'react';
import styles from './UploadReleaseForm.module.scss';
import { createRelease } from '@/services/release';

interface UploadReleaseFormProps {
  onClose: () => void;
  onUploadSuccess: () => void;
}

const UploadReleaseForm = ({
  onClose,
  onUploadSuccess,
}: UploadReleaseFormProps) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Envie um arquivo de áudio.');

    const release = {
      title,
      type: 'SINGLE',
      genre,
      file,
    };

    setLoading(true);
    try {
      await createRelease(release);
      onUploadSuccess();
      onClose();
    } catch (err) {
      console.error('Erro ao fazer upload:', err);
      alert('Erro ao enviar faixa. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.uploadForm}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Nome da música
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Ex: Minha Canção"
          />
        </label>

        <label className={styles.label}>
          Gênero
          <select
            className={styles.input}
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

        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? 'Enviando...' : 'Enviar faixa'}
        </button>
      </form>
    </div>
  );
};

export default UploadReleaseForm;
