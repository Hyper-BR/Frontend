import { useEffect, useState } from 'react';
import { Playlists } from '../Playlists/Playlists';
import styles from './Sidebar.module.scss';
import { getPlaylistsCustomer } from '../../../../src/services/playlist';
import { PlaylistDTO } from '../../../../src/services/playlist/types';

const Sidebar = () => {
  const [playlists, setPlayists] = useState<PlaylistDTO[]>([]);

  return (
    <aside className={styles.sidebar}>
      <Playlists
        onSelect={(playlist) => console.log('Selecionou:', playlist.name)}
      />
    </aside>
  );
};

export default Sidebar;
