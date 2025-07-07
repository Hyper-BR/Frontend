import { useAuth } from '@/hooks/useAuth';
import { getTracksByArtist } from '@/services/track';
import { getPlaylistsCustomer } from '@/services/playlist';
import { useEffect, useState } from 'react';
import UserProfile from '@/components/commons/UserProfile/UserProfile';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { customer } = useAuth();
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getTracksByArtist(customer.artistProfile?.id).then((r) =>
      setTracks(r.data.content),
    );
    // getPlaylistsCustomer().then((r) => setPlaylists(r.data));
    // getAnalytics(customer.id).then((r) => setAnalytics(r.data));
  }, []);

  return (
    <UserProfile
      user={customer}
      tracks={tracks}
      playlists={playlists}
      isOwner
      analytics={analytics}
      onEditProfile={() => navigate('/profile/edit')}
      handleAddToPlaylist={null}
    />
  );
}
