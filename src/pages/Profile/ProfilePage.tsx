import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPlaylistsCustomer } from '@/services/playlist';
import { getTracksByArtist } from '@/services/track';
import ProfileLayout from '@/components/commons/Profile/ProfileLayout';

export default function ProfilePage() {
  const { customer } = useAuth();
  const navigate = useNavigate();
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getPlaylistsCustomer().then((r) => setPlaylists(r.data));
  }, [customer]);

  return (
    <ProfileLayout
      avatarUrl={'https://i.pravatar.cc/1579?u='}
      name={customer.artistProfile?.username}
      email={customer.email}
      stats={{ followers: 120, following: 87 }}
      analytics={null}
      onEdit={() => navigate('/profile/edit')}
      tracks={tracks || null}
      playlists={playlists}
      owner
    />
  );
}
