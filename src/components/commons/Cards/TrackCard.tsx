import { Link } from 'react-router-dom';
import styles from './TrackCard.module.scss';
import { TrackDTO } from '@/services/track/types';

type TrackCardProps = {
  track: TrackDTO;
  onPlay?: () => void;
};

export default function TrackCard({ track, onPlay }: TrackCardProps) {
  const handlePlay = () => {
    if (onPlay) {
      onPlay();
    }
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.imageWrapper}
        style={{ backgroundImage: `url('https://i.pravatar.cc/1579?u=')` }}
        onClick={handlePlay}
      >
        {onPlay && (
          <button
            className={styles.playButton}
            onClick={(e) => {
              e.stopPropagation();
              handlePlay();
            }}
          >
            ▶
          </button>
        )}
      </div>

      <div className={styles.info}>
        <Link to={`/track/${track.id}`} className={styles.trackLink}>
          {track.title}
        </Link>
        <p className={styles.artists}>
          {track.artists.map((artist, idx) => (
            <div key={artist.id}>
              <Link to={`/artist/${artist.id}`} className={styles.artistLink}>
                {artist.username}
              </Link>
              {idx < track.artists.length - 1 && ', '}
            </div>
          ))}
        </p>
      </div>
    </div>
  );
}
