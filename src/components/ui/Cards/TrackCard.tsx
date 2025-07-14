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

export function TrackCard({
  track,
  size = 'md',
  direction = 'row',
  shape = 'square',
  align,
}: Props) {
  const { setTrackPlayer } = usePlayer();
  return (
    <Card.Root
      direction={direction}
      imageUrl={'https://i.pravatar.cc/1579?u='}
      shape={shape}
      size={size}
      clickable
      onClick={() => setTrackPlayer(track)}
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
          onClick={() => setTrackPlayer(track)}
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
