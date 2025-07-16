import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import clsx from 'clsx';
import React from 'react';
import styles from './Droppable.module.scss';

interface Props {
  label?: string;
  onDrop: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  shape?: 'square' | 'round' | 'rectangle';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  file?: File;
  className?: string;
}

export function Droppable({
  label = 'Arraste ou clique para enviar',
  onDrop,
  multiple = false,
  accept = 'image/*',
  shape = 'square',
  size = 'md',
  className,
  file,
}: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const previewUrl = (file && URL.createObjectURL(file)) || null;

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) onDrop(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) onDrop(files);
  };

  return (
    <div
      className={clsx(
        styles.wrapper,
        shape === 'rectangle' && styles[`rectangle-${size}`],
        shape !== 'rectangle' && styles[size],
        isDragging && styles.hover,
        className,
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleFileSelect}
        ref={inputRef}
        hidden
      />
      {previewUrl ? (
        <TransformWrapper>
          <TransformComponent>
            <img src={previewUrl} className={styles.preview} />
          </TransformComponent>
        </TransformWrapper>
      ) : (
        <span className={styles.label}>{label}</span>
      )}
    </div>
  );
}
