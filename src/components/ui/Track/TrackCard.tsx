import { usePlayer } from '@/contexts/PlayerContext';
import { TrackDTO } from '@/services/track/types';
import { Card } from '@/components/commons/Card';
import { TrackLink } from '@/components/commons/Link/TrackLink';
import { ArtistLink } from '@/components/commons/Link/ArtistLink';
import { ArtistLinkGroup } from '@/components/commons/Link/ArtistLinkGroup';

interface Props {
  track: TrackDTO;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'square' | 'round';
  align?: 'left' | 'center';
  direction?: 'row' | 'column';
  firstLinkSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  secondLinkSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export function TrackCard({
  track,
  size = 'md',
  direction = 'row',
  shape = 'square',
  align,
  firstLinkSize = 'md',
  secondLinkSize,
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
    <Card.Root
      direction={direction}
      imageUrl={track.coverUrl}
      shape={shape}
      size={size}
      clickable
      onClick={handlePlayClick}
      align={align}
    >
      <Card.Title>
        <TrackLink track={track} size={firstLinkSize} color="white" />
      </Card.Title>
      <Card.Subtitle>
        <ArtistLinkGroup artists={track.artists} color="muted" size={secondLinkSize} />
      </Card.Subtitle>
    </Card.Root>
  );
}
