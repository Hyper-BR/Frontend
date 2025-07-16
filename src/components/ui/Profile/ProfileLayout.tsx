import { useState } from 'react';

import { TrackPageDTO } from '@/services/track/types';
import { PlaylistDTO } from '@/services/playlist/types';
import EditProfileModal from '@/components/ui/Modals/EditProfileModal';
import { Root } from '../../commons/Profile/Root';
import { Header } from '../../commons/Profile/Header';
import { Stats } from '../../commons/Profile/Stats';
import { Tabs, Tab } from '../../commons/Profile/Tabs';
import { Content } from '../../commons/Profile/Content';

interface Props {
  avatarUrl: string;
  name: string;
  email?: string;
  stats: { followers: string; following: string };
  analytics?: { plays: string };
  onEdit?: boolean;
  tracks: TrackPageDTO;
  playlists: PlaylistDTO[];
  owner?: boolean;
}

export default function ProfileLayout({
  avatarUrl,
  name,
  email,
  stats,
  analytics,
  onEdit,
  tracks,
  playlists,
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
        />
        <Tabs active={activeTab} setActive={setActiveTab} />
        <Content tab={activeTab} tracks={tracks?.content} />
      </Root>
    </>
  );
}
