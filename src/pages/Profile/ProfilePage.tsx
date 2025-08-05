import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { getPlaylistsCustomer } from '@/services/playlist';
import ProfileLayout from '@/components/ui/Profile/ProfileLayout';
import { TrackPageDTO } from '@/services/track/types';
import { PlaylistDTO } from '@/services/playlist/types';
import { getCustomerTracks } from '@/services/track';

export default function ProfilePage() {
  const [tracks, setTracks] = useState<TrackPageDTO>(null);
  const [playlists, setPlaylists] = useState<PlaylistDTO[]>([]);

  const { customer, isArtist } = useAuth();

  const fetchData = async () => {
    const response = await getPlaylistsCustomer();
    setPlaylists(response.data);

    if (isArtist) {
      const trackPage = await getCustomerTracks();
      setTracks(trackPage.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [customer]);

  return (
    <ProfileLayout
      avatarUrl={customer?.avatarUrl}
      coverUrl={customer?.coverUrl}
      name={customer.artistProfile != null ? customer?.artistProfile?.username : customer.name}
      email={customer.email}
      stats={{ followers: customer?.followers, following: customer?.following }}
      analytics={null}
      onEdit
      tracks={tracks}
      playlists={playlists}
      albums={[]}
      feed={[]}
      relatedArtists={[]}
      owner
    />
  );
}
