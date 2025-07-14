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
  stats: { followers: number; following: number };
  analytics?: { plays: number; followers: number };
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
          stats={{ followers: '87', following: '120' }}
          analytics={{ plays: '1000' }}
        />
        <Tabs active={activeTab} setActive={setActiveTab} />
        <Content tab={activeTab} tracks={tracks?.content} />
      </Root>
    </>
  );
}
