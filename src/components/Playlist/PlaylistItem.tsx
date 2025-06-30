import { Listbox, ListboxItem } from '@nextui-org/react';

import './styles.scss';

interface PlaylistItemsProps {
  id: string;
  text: string;
}

export function PlaylistItem({ id, text }: PlaylistItemsProps) {
  return (
    <div className="div_playlist_item">
      <Listbox>
        <ListboxItem key={id}>{text}</ListboxItem>
      </Listbox>
    </div>
  );
}
