import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArtistById } from '@/services/artist';
import { getTracksByArtist } from '@/services/track';
import ProfileLayout from '@/components/commons/Profile/ProfileLayout';

export default function ArtistPage() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!id) return;
    getArtistById(id).then((r) => setArtist(r.data));
    getTracksByArtist(id).then((r) => setTracks(r.data.content));
  }, [id]);

  if (!artist) return <div>Carregando...</div>;

  return (
    <ProfileLayout
      avatarUrl={'https://i.pravatar.cc/1579?u='}
      stats={{ followers: 120, following: 87 }}
      name={artist.username}
      tracks={tracks}
      playlists={null}
    />
  );
}
