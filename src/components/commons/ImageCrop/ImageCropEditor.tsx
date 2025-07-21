import AvatarEditor from 'react-avatar-editor';
import { useRef, useState, useEffect } from 'react';
import { Slider } from '../Slider/Slider';
import styles from './ImageCropEditor.module.scss';

interface Props {
  image: string;
  cropShape?: 'rect' | 'round' | 'square';
  zoom?: number;
  zoomRange?: [number, number];
  showZoom?: boolean;
  containerSize?: { width: number; height: number };
  outputSize?: { width: number; height: number };
  onZoomChange?: (zoom: number) => void;
  onCropComplete?: (canvas: HTMLCanvasElement) => void;
}

export function ImageCropEditor({
  image,
  cropShape = 'rect',
  zoom,
  zoomRange = [1, 3],
  showZoom = true,
  containerSize = { width: 360, height: 320 },
  outputSize,
  onZoomChange,
  onCropComplete,
}: Props) {
  const editorRef = useRef<AvatarEditor>(null);
  const [scale, setScale] = useState(zoom ?? 1);

  useEffect(() => {
    if (zoom !== undefined) setScale(zoom);
  }, [zoom]);

  useEffect(() => {
    if (!editorRef.current || !onCropComplete) return;
    const canvas = editorRef.current.getImageScaledToCanvas();
    onCropComplete(canvas);
  }, [scale, onCropComplete]);

  const handleZoomChange = (value: number) => {
    setScale(value);
    onZoomChange?.(value);
  };

  const dpr = window.devicePixelRatio || 1;
  const finalSize = outputSize ?? containerSize;
  const internalWidth = finalSize.width * dpr;
  const internalHeight = finalSize.height * dpr;

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
        <AvatarEditor
          ref={editorRef}
          image={image}
          width={internalWidth}
          height={internalHeight}
          border={0}
          borderRadius={cropShape === 'round' ? internalWidth / 2 : 0}
          scale={scale}
          style={{
            width: containerSize.width,
            height: containerSize.height,
          }}
        />
      </div>

      {showZoom && (
        <div className={styles.zoom}>
          <Slider
            min={zoomRange[0]}
            max={zoomRange[1]}
            step={0.01}
            value={scale}
            onChange={(e) => handleZoomChange(Number(e))}
          />
        </div>
      )}
    </>
  );
}
