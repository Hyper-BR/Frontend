import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArtistById } from '@/services/artist';
import { getTracksByArtist } from '@/services/track';
import ProfileLayout from '@/components/ui/Profile/ProfileLayout';
import { TrackPageDTO } from '@/services/track/types';
import { ArtistDTO } from '@/services/artist/types';
import { getArtistPlaylists } from '@/services/playlist';
import { PlaylistDTO } from '@/services/playlist/types';
import { ReleaseDTO } from '@/services/release/types';
import { getArtistReleases } from '@/services/release';

export default function ArtistPage() {
  const { id } = useParams();
  const [artist, setArtist] = useState<ArtistDTO>(null);
  const [tracks, setTracks] = useState<TrackPageDTO>(null);
  const [playlists, setPlaylists] = useState<PlaylistDTO[]>([]);
  const [releases, setReleases] = useState<ReleaseDTO[]>([]);

  const fetchData = async () => {
    const response = await getArtistById(id);
    setArtist(response.data);

    const trackPage = await getTracksByArtist(id);
    setTracks(trackPage.data);

    const playlistResponse = await getArtistPlaylists(id);
    setPlaylists(playlistResponse.data);

    const releasesResponse = await getArtistReleases(id);
    setReleases(releasesResponse.data.content);
  };

  useEffect(() => {
    if (!id) return;
    fetchData();
  }, [id]);

  return (
    <ProfileLayout
      avatarUrl={artist?.avatarUrl}
      coverUrl={artist?.coverUrl}
      stats={{ followers: artist?.followers, following: artist?.following }}
      name={artist?.username}
      tracks={tracks}
      playlists={playlists}
      releases={releases}
    />
  );
}
