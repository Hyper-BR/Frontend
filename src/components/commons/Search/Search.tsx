import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Search.module.scss';

export default function Search() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      const encoded = encodeURIComponent(query.trim());
      navigate(`/search?q=${encoded}`);
    }
  };

  return (
    <input
      type="text"
      className={styles.searchInput}
      placeholder="Buscar artistas, faixas ou playlists..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
