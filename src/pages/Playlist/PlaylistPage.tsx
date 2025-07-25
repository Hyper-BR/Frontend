import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PlaylistDTO } from '@/services/playlist/types';
import { getPlaylistById } from '@/services/playlist';
import styles from './PlaylistPage.module.scss';
import TrackTable from '@/components/ui/Tracks/TrackTable';

const PlaylistPage = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState<PlaylistDTO | null>(null);

  const fetchPlaylist = async () => {
    const response = await getPlaylistById(id);
    setPlaylist(response.data);
  };

  useEffect(() => {
    fetchPlaylist();
  }, [id]);

  if (!playlist) return <p>Carregando...</p>;

  return (
    <section className={styles.playlistPage}>
      <h2>{playlist.name}</h2>
      <p>{playlist.description}</p>

      <TrackTable tracks={playlist.tracks} />
    </section>
  );
};

export default PlaylistPage;
