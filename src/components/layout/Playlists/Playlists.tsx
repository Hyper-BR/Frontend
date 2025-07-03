// components/Sidebar/PlaylistList.tsx
import { PlaylistDTO } from '../../../../src/services/playlist/types';
import styles from './PlaylistList.module.scss';

interface PlaylistListProps {
  playlists: PlaylistDTO[];
  onSelect: (playlist: PlaylistDTO) => void;
}

export const Playlists = ({ playlists, onSelect }: PlaylistListProps) => {
  return (
    <div className={styles.playlistList}>
      <button className="add-playlist-button">➕ Nova Playlist</button>

      {playlists.map((playlist) => (
        <div
          key={playlist.id}
          className={styles.item}
          onClick={() => onSelect(playlist)}
        >
          <img
            src={playlist.image}
            alt={playlist.name}
            className={styles.cover}
          />
          <span className={styles.name}>{playlist.name}</span>
        </div>
      ))}
    </div>
  );
};
