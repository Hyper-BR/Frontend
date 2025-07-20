import { usePlayer } from '@/contexts/PlayerContext';
import { TrackDTO } from '@/services/track/types';
import { Card } from '@/components/commons/Card';
import { Button } from '@/components/commons/Button/Button';
import { TrackLink } from '@/components/commons/Link/TrackLink';
import { ArtistLink } from '@/components/commons/Link/ArtistLink';

interface Props {
  track: TrackDTO;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'square' | 'round';
  align?: 'left' | 'center';
  direction?: 'row' | 'column';
  linkSize?: 'sm' | 'md' | 'lg';
}

export function TrackCard({ track, size = 'md', direction = 'row', shape = 'square', align, linkSize = 'md' }: Props) {
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
        <TrackLink title={track.title} id={track.id} onClick={() => {}} size={linkSize} color="white" />
      </Card.Title>
      <Card.Subtitle>
        {track.artists.map((artist) => (
          <ArtistLink key={artist.id} name={artist.username} id={artist.id} size="md" color="muted" />
        ))}
      </Card.Subtitle>
    </Card.Root>
  );
}
