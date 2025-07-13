import styles from './Droppable.module.scss';
import clsx from 'clsx';
import React from 'react';

interface Props {
  label?: string;
  onDrop: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  shape?: 'square' | 'round';
  size?: 'sm' | 'md' | 'lg';
  file?: File;
}

export function Droppable({
  label = 'Arraste ou clique para enviar',
  onDrop,
  multiple = false,
  accept = 'image/*',
  shape = 'square',
  size = 'md',
  file,
}: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const previewUrl = file ? URL.createObjectURL(file) : null;

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
        styles[shape],
        styles[size],
        isDragging && styles.hover,
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
        <img src={previewUrl} className={styles.preview} />
      ) : (
        <span className={styles.label}>{label}</span>
      )}
    </div>
  );
}
