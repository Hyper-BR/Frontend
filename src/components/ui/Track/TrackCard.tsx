import { usePlayer } from '@/contexts/PlayerContext';
import { TrackDTO } from '@/services/track/types';
import { Card } from '@/components/commons/Card';
import { TrackLink } from '@/components/commons/Link/TrackLink';
import { ArtistLinkGroup } from '@/components/commons/Link/ArtistLinkGroup';
import { DragDropZone } from '@/components/commons/DragDropZone/DragDropZone';

interface Props {
  track: TrackDTO;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'square' | 'round';
  align?: 'left' | 'center';
  direction?: 'row' | 'column';
  firstLinkSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  secondLinkSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  enableHoverEffect?: boolean;
  hovered?: boolean;
}

export function TrackCard({
  track,
  size = 'md',
  direction = 'row',
  shape = 'square',
  align,
  firstLinkSize = 'md',
  secondLinkSize,
  enableHoverEffect,
  hovered,
}: Props) {
  const { currentTrack, setTrackList, trackList, play } = usePlayer();

  const handlePlayClick = () => {
    const isAlreadyPlayingThis = currentTrack?.id === track.id;
    const isTrackInList = trackList.some((t) => t.id === track.id);

    if (!isAlreadyPlayingThis) {
      const newList = isTrackInList ? trackList : [track];
      const index = newList.findIndex((t) => t.id === track.id);
      setTrackList(newList, index);
      play();
    }
  };

  return (
    <DragDropZone entityId={track.id} draggable>
      <Card.Root
        direction={direction}
        imageUrl={track.coverUrl}
        shape={shape}
        size={size}
        clickable
        onClick={handlePlayClick}
        align={align}
        enableHoverEffect={enableHoverEffect}
        hovered={hovered}
      >
        <Card.Title>
          <TrackLink track={track} size={firstLinkSize} color="white" />
        </Card.Title>
        <Card.Subtitle>
          <ArtistLinkGroup artists={track.artists} color="muted" size={secondLinkSize} />
        </Card.Subtitle>
      </Card.Root>
    </DragDropZone>
  );
}
