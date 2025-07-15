import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArtistById } from '@/services/artist';
import { getTracksByArtist } from '@/services/track';
import ProfileLayout from '@/components/ui/Profile/ProfileLayout';
import { TrackPageDTO } from '@/services/track/types';

export default function ArtistPage() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [tracks, setTracks] = useState<TrackPageDTO>(null);

  const fetchData = () => {
    const response = getArtistById(id);
    response.then((r) => setArtist(r.data));

    const trackPage = getTracksByArtist(id);
    trackPage.then((r) => setTracks(r.data));
  };

  useEffect(() => {
    if (!id) return;
    fetchData();
  }, [id]);

  return (
    <ProfileLayout
      avatarUrl={'https://i.pravatar.cc/1579?u='}
      stats={{ followers: '120', following: '87' }}
      name={artist?.username}
      tracks={tracks}
      playlists={null}
    />
  );
}
