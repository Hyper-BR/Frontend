import React from 'react';
import styles from './UploadButton.module.scss';
import { saveTracks } from '@/src/services/track';

const UploadButton = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('🎵 Música selecionada:', file.name);
    }
  };

  return (
    <label className={styles.upload}>
      Selecionar música
      <input type="file" accept="audio/*" onChange={handleChange} />
    </label>
  );
};

export default UploadButton;
