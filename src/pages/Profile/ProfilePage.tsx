import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPlaylistsCustomer } from '@/services/playlist';
import { getTracksByArtist } from '@/services/track';
import ProfileLayout from '@/components/ui/Profile/ProfileLayout';
import { TrackPageDTO } from '@/services/track/types';
import { PlaylistDTO } from '@/services/playlist/types';

export default function ProfilePage() {
  const [tracks, setTracks] = useState<TrackPageDTO>(null);
  const [playlists, setPlaylists] = useState<PlaylistDTO[]>([]);

  const { customer } = useAuth();
  const navigate = useNavigate();

  const fetchData = () => {
    const response = getPlaylistsCustomer();
    response.then((r) => setPlaylists(r.data));

    const trackPage = getTracksByArtist(customer?.artistProfile?.id);
    trackPage.then((r) => setTracks(r.data));
  };

  useEffect(() => {
    fetchData();
  }, [customer]);

  return (
    <ProfileLayout
      avatarUrl={'https://i.pravatar.cc/1579?u='}
      name={
        customer.artistProfile != null
          ? customer?.artistProfile?.username
          : customer.name
      }
      email={customer.email}
      stats={{ followers: 120, following: 87 }}
      analytics={null}
      onEdit
      tracks={tracks}
      playlists={playlists}
      owner
    />
  );
}
