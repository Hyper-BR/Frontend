import { Root } from '@/components/commons/Card/Root';
import { Button } from '@/components/commons/Button/Button';
import { Title } from '@/components/commons/Card/Title';
import { Subtitle } from '@/components/commons/Card/Subtitle';
import styles from './Track.module.scss';
import { usePlayer } from '@/contexts/PlayerContext';
import { TrackDTO } from '@/services/track/types';

interface Props {
  track: TrackDTO;
  size?: 'sm' | 'md' | 'lg';
}

export function Track({ track, size = 'md' }: Props) {
  const { setTrackPlayer } = usePlayer();
  return (
    <Root
      imageUrl={'https://i.pravatar.cc/1579?u='}
      shape="square"
      size={size}
      clickable
      onClick={() => setTrackPlayer(track)}
      align="center"
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

      <Title text={track.title} href={`/track/${track.id}`} />
      <Subtitle
        items={track.artists.map((a) => ({
          text: a.username,
          href: `/artist/${a.id}`,
        }))}
      />
    </Root>
  );
}
