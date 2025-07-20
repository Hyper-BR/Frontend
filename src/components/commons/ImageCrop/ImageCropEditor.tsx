import Cropper from 'react-easy-crop';
import { useState, useCallback } from 'react';
import styles from './ImageCropEditor.module.scss';

interface Props {
  image: string;
  aspect?: number;
  cropShape?: 'rect' | 'round';
  onCropComplete: (croppedAreaPixels: any) => void;
}

export function ImageCropEditor({ image, aspect = 1, cropShape = 'rect', onCropComplete }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.2);

  const handleCropComplete = useCallback(
    (_: any, croppedAreaPixels: any) => {
      onCropComplete(croppedAreaPixels);
    },
    [onCropComplete],
  );

  return (
    <div className={styles.cropContainer}>
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={aspect}
        cropShape={cropShape}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={handleCropComplete}
        showGrid={false}
        style={{
          containerStyle: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000', // ✅ fundo neutro
          },
          mediaStyle: {
            objectFit: 'cover',
          },
        }}
      />
    </div>
  );
}
