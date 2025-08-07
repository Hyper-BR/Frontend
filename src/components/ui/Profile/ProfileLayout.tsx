import { useState } from 'react';
import { TrackPageDTO } from '@/services/track/types';
import { PlaylistDTO } from '@/services/playlist/types';
import EditProfileModal from '@/components/ui/Modals/EditProfile/EditProfileModal';
import { Root } from '../../commons/Profile/Root';
import { Header } from '../../commons/Profile/Header';
import { Tabs, Tab } from '../../commons/Profile/Tabs';
import { Content } from '../../commons/Profile/Content';
import { ReleaseDTO } from '@/services/release/types';

interface Props {
  avatarUrl: string;
  coverUrl: string;
  name: string;
  email?: string;
  stats: { followers: string; following: string };
  analytics?: { plays: string };
  onEdit?: boolean;
  releases: ReleaseDTO[];
  owner?: boolean;
  tracks: TrackPageDTO;
  playlists: PlaylistDTO[];
}

export default function ProfileLayout({
  avatarUrl,
  coverUrl,
  name,
  email,
  stats,
  analytics,
  onEdit,
  tracks,
  playlists,
  releases,
  owner,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('Faixas');

  return (
    <>
      <EditProfileModal />
      <Root>
        <Header
          avatarUrl={avatarUrl}
          name={name}
          email={email}
          onEdit={onEdit}
          owner={owner}
          stats={stats}
          analytics={analytics}
          coverUrl={coverUrl}
        />
        <Tabs active={activeTab} setActive={setActiveTab} owner={owner} />
        <Content tab={activeTab} tracks={tracks?.content} playlists={playlists} owner={owner} releases={releases} />
      </Root>
    </>
  );
}
