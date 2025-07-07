import { useParams } from 'react-router-dom';
import { getTracksByArtist } from '@/services/track';
import { useEffect, useState } from 'react';
import { ArtistDTO } from '@/services/artist/types';
import { TrackDTO } from '@/services/track/types';
import { PlaylistDTO } from '@/services/playlist/types';
import UserProfile from '@/components/commons/UserProfile/UserProfile';

export default function ArtistPage() {
  const { artistId } = useParams();
  const [artist, setArtist] = useState<ArtistDTO>(null);
  const [tracks, setTracks] = useState<TrackDTO[]>([]);
  const [playlists, setPlaylists] = useState<PlaylistDTO[]>([]);

  useEffect(() => {
    if (!artistId) return;
    // getArtistById(artistId).then((r) => setArtist(r.data));
    // getTracksByArtist(artistId).then((r) => setTracks(r.data.content));
    // getPlaylistsByArtist(artistId).then((r) => setPlaylists(r.data));
  }, [artistId]);

  if (!artist) return <div>Carregando...</div>;

  return (
    <UserProfile
      user={null}
      tracks={tracks}
      playlists={playlists}
      isOwner={false}
      handleAddToPlaylist={null}
    />
  );
}
