import { useEffect, useState } from 'react';
import { Playlists } from '../Playlists/Playlists';
import styles from './Sidebar.module.scss';
import { getPlaylistsCustomer } from '../../../../src/services/playlist';
import { PlaylistDTO } from '../../../../src/services/playlist/types';

const Sidebar = () => {
  const [playlists, setPlayists] = useState<PlaylistDTO[]>([]);

  const fetchPlaylists = async () => {
    try {
      const response = await getPlaylistsCustomer();
      setPlayists(response.data);
    } catch (error) {
      console.error('Erro ao buscar playlists:', error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <aside className={styles.sidebar}>
      <Playlists
        playlists={playlists}
        onSelect={(playlist) => console.log('Selecionou:', playlist.name)}
      />
    </aside>
  );
};

export default Sidebar;
