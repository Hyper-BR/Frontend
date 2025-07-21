import Cropper from 'react-easy-crop';
import { useState, useCallback, useEffect } from 'react';
import styles from './ImageCropEditor.module.scss';
import { Slider } from '../Slider/Slider';

interface Props {
  image: string;
  aspect?: number;
  cropShape?: 'rect' | 'round';
  initialZoom?: number;
  zoom?: number;
  zoomRange?: [number, number];
  showZoom?: boolean;
  containerSize?: { width: number; height: number };
  onZoomChange?: (zoom: number) => void;
  onCropComplete: (croppedAreaPixels: any) => void;
}

export function ImageCropEditor({
  image,
  aspect = 1,
  cropShape = 'rect',
  initialZoom = 1.2,
  zoom,
  zoomRange = [1, 3],
  showZoom = true,
  containerSize = { width: 360, height: 320 },
  onZoomChange,
  onCropComplete,
}: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [internalZoom, setInternalZoom] = useState(initialZoom);

  const activeZoom = zoom ?? internalZoom;
  const handleZoomChange = (value: number) => {
    setInternalZoom(value);
    onZoomChange?.(value);
  };

  const handleCropComplete = useCallback(
    (_: any, croppedAreaPixels: any) => {
      onCropComplete(croppedAreaPixels);
    },
    [onCropComplete],
  );

  return (
    <>
      <div
        className={`${styles.cropContainer} ${styles[cropShape]}`}
        style={{
          width: containerSize.width,
          height: containerSize.height,
          margin: '0 auto',
        }}
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={activeZoom}
          aspect={aspect}
          cropShape={cropShape}
          onCropChange={setCrop}
          onZoomChange={handleZoomChange}
          onCropComplete={handleCropComplete}
          showGrid={false}
        />
      </div>
      <div className={styles.zoom}>
        {showZoom && (
          <Slider
            min={zoomRange[0]}
            max={zoomRange[1]}
            step={0.01}
            value={activeZoom}
            onChange={(e) => handleZoomChange(Number(e))}
          />
        )}
      </div>
    </>
  );
}
