import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PlaylistDTO } from '@/services/playlist/types';
import { getPlaylistById, addTrackToPlaylist } from '@/services/playlist';
import TrackTable from '@/components/commons/Track/TrackTable';
import styles from './PlaylistPage.module.scss';

const PlaylistPage = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState<PlaylistDTO | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

  const fetchPlaylist = async () => {
    const response = await getPlaylistById(id);
    setPlaylist(response.data);
  };

  const handleAddToPlaylist = async (trackId: string, playlistId: string) => {
    await addTrackToPlaylist(playlistId, trackId);
    setOpenMenuId(null);
  };

  useEffect(() => {
    fetchPlaylist();
  }, [id]);

  if (!playlist) return <p>Carregando...</p>;

  return (
    <section className={styles.playlistPage}>
      <h2>{playlist.name}</h2>
      <p>{playlist.description}</p>

      <TrackTable
        tracks={playlist.tracks}
        selectedTrackId={selectedTrackId}
        setSelectedTrackId={setSelectedTrackId}
        handleAddToPlaylist={handleAddToPlaylist}
      />
    </section>
  );
};

export default PlaylistPage;
