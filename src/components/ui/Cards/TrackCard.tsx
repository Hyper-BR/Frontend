import styles from './TrackCard.module.scss';
import { usePlayer } from '@/contexts/PlayerContext';
import { TrackDTO } from '@/services/track/types';
import { Card } from '@/components/commons/Card';
import { Button } from '@/components/commons/Button/Button';

interface Props {
  track: TrackDTO;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'square' | 'round';
  align?: 'left' | 'center';
  direction?: 'row' | 'column';
}

export function TrackCard({ track, size = 'md', direction = 'row', shape = 'square', align }: Props) {
  const { currentTrack, setTrackList, trackList, play } = usePlayer();

  const handlePlayClick = () => {
    const isAlreadyPlayingThis = currentTrack?.id === track.id;
    const isTrackInList = trackList.some((t) => t.id === track.id);

    if (!isAlreadyPlayingThis) {
      // ✅ define a fila com apenas essa track (ou adicione à fila se preferir)
      const newList = isTrackInList ? trackList : [track];
      const index = newList.findIndex((t) => t.id === track.id);
      setTrackList(newList, index);
      play(); // ✅ inicia reprodução
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
      <div className={styles.imageWrapper}>
        <Button
          className={styles.playButton}
          variant="transparent"
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          }
          onClick={handlePlayClick}
        />
      </div>

      <Card.Title text={track.title} href={`/track/${track.id}`} />
      <Card.Subtitle
        items={track.artists.map((a) => ({
          text: a.username,
          href: `/artist/${a.id}`,
        }))}
      />
    </Card.Root>
  );
}
