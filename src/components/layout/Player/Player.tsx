import React from 'react';
import styles from './Player.module.scss';

const Player = () => {
  return (
    <footer className={styles.player}>
      <div className={styles.songInfo}>
        <img
          src="https://via.placeholder.com/56"
          alt="cover"
          className={styles.cover}
        />
        <div>
          <p className={styles.title}>Nome da Música</p>
          <p className={styles.artist}>Artista</p>
        </div>
      </div>

      <div className={styles.controls}>
        <button>⏮</button>
        <button>⏯</button>
        <button>⏭</button>
        <input type="range" className={styles.progress} />
      </div>

      <div className={styles.volume}>
        🔊
        <input type="range" />
      </div>
    </footer>
  );
};

export default Player;
