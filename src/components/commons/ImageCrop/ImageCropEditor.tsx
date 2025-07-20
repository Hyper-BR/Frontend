import Cropper from 'react-easy-crop';
import { useState, useCallback } from 'react';
import styles from './ImageCropEditor.module.scss';
import { buildFullUrl } from '@/utils/buildFullUrl';

interface Props {
  image: string;
  aspect?: number;
  onCropComplete: (croppedAreaPixels: any) => void;
}

export function ImageCropEditor({ image, aspect = 1, onCropComplete }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleCropComplete = useCallback(
    (_: any, croppedAreaPixels: any) => {
      onCropComplete(croppedAreaPixels);
    },
    [onCropComplete],
  );

  return (
    <div className={styles.cropContainer}>
      <Cropper
        image={buildFullUrl(image)}
        crop={crop}
        zoom={zoom}
        aspect={aspect}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={handleCropComplete}
        showGrid={false}
      />

      <input
        type="range"
        min={1}
        max={3}
        step={0.01}
        value={zoom}
        onChange={(e) => setZoom(Number(e.target.value))}
        className={styles.zoomSlider}
      />
    </div>
  );
}
