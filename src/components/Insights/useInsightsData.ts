import { getTracks } from '@/services/track';
import { useEffect, useState } from 'react';

export function useInsightsData() {
  const [summary, setSummary] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);

  const fetchAll = async () => {
    try {
      const { data } = await getTracks();
      setTracks(data.content);
    } catch (error) {
      console.error('Erro ao buscar tracks:', error);
    }
    //   setSummary(sumRes.data);
    //   setAlbums(albumsRes.data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { summary, tracks, albums };
}
