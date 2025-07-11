// src/components/TrackCard/TrackCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TrackCard.module.scss';
import { ArtistDTO } from '@/services/artist/types';

type TrackCardProps = {
  image: string;
  title: string;
  artists: ArtistDTO[];
  onPlay?: () => void;
};

export default function TrackCard({
  image,
  title,
  artists,
  onPlay,
}: TrackCardProps) {
  const handlePlay = () => {
    if (onPlay) {
      onPlay();
    }
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.imageWrapper}
        style={{ backgroundImage: `url(${image})` }}
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
        <p className={styles.title}>{title}</p>
        <p className={styles.artists}>
          {artists.map((artist, idx) => (
            <React.Fragment key={artist.id}>
              <Link to={`/artist/${artist.id}`} className={styles.artistLink}>
                {artist.username}
              </Link>
              {idx < artists.length - 1 && ', '}
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
}
