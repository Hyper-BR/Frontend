import React from 'react';
import styles from './ArtistCard.module.scss';

type ArtistCardProps = {
  image: string;
  name: string;
  onClick?: () => void;
};

export default function ArtistCard({ image, name, onClick }: ArtistCardProps) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div
        className={styles.imageWrapper}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={styles.overlay} />
      </div>
      <p className={styles.name}>{name}</p>
    </div>
  );
}
