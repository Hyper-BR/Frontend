import { Listbox, ListboxItem } from '@nextui-org/react';
import './styles.scss';

export const Sidebar = () => {
  return (
    <div className="flex">
      <div className="sidebar">
        <Listbox>
          <ListboxItem key="collections">Collections</ListboxItem>
          <ListboxItem key="playlists">Playlists</ListboxItem>
          <ListboxItem key="likes">Curtidas</ListboxItem>
        </Listbox>
      </div>
    </div>
  );
};
