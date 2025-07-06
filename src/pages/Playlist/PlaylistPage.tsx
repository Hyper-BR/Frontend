import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PlaylistDTO } from '@/services/playlist/types';
import { getPlaylistById } from '@/services/playlist';

const PlaylistPage = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState<PlaylistDTO>(null);

  const fetchPlaylist = async () => {
    const response = await getPlaylistById(id);
    setPlaylist(response.data);
  };

  useEffect(() => {
    fetchPlaylist();
  }, [id]);

  if (!playlist) return <p>Carregando...</p>;

  return (
    <section>
      <h2>{playlist.name}</h2>
      <p>{playlist.description}</p>

      <ul>
        {playlist.tracks.map((track) => (
          <li key={track.id}>
            <strong>{track.title}</strong> –{' '}
            {track.artists?.map((a) => a.username) || []}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PlaylistPage;
