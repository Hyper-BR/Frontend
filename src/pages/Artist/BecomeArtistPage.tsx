import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import styles from './BecomeArtistPage.module.scss';
import { createArtist } from '@/services/artist';
import { ArtistDTO } from '@/services/artist/types';
import { Input } from '@/components/commons/Input/Input';
import { Button } from '@/components/commons/Button/Button';

const BecomeArtistPage = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { loadUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const artistData: Partial<ArtistDTO> = {
      username,
    };

    try {
      await createArtist(artistData);
      loadUser();
      navigate('/');
    } catch (err) {
      console.error('Erro ao criar artista:', err);
      alert('Não foi possível criar o artista. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Crie seu projeto artístico</h2>
        <label>
          Nome do projeto
          <Input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ex: Gustavo & Os Bits"
          />
        </label>
        <Button type="submit" disabled={loading}>
          {loading ? 'Criando...' : 'Tornar-se artista'}
        </Button>
      </form>
    </div>
  );
};

export default BecomeArtistPage;
