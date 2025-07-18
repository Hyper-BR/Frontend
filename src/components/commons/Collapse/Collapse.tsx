import { useState } from 'react';
import styles from './Collapse.module.scss';

export interface CollapseProps {
  image?: string;
  imagePosition?: 'left' | 'right';
  imageShape?: 'circle' | 'square';
  label?: string;
  labelPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  onToggle?: (isOpen: boolean) => void;
  children: React.ReactNode;
}

const Collapse: React.FC<CollapseProps> = ({
  image,
  imagePosition = 'left',
  imageShape = 'square',
  label,
  labelPosition = 'left',
  size = 'md',
  onToggle,
  children,
}) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    const next = !open;
    setOpen(next);
    onToggle?.(next);
  };

  return (
    <div
      className={`${styles.collapse} ${styles[size]} ${
        open ? styles.open : ''
      }`}
    >
      <div className={styles.header} onClick={handleToggle}>
        {image && imagePosition === 'left' && (
          <img
            src={image}
            className={`${styles.image} ${styles[imageShape]}`}
            alt="collapse"
          />
        )}

        {label && labelPosition === 'left' && (
          <span className={styles.label}>{label}</span>
        )}

        <span className={styles.chevron}>{open ? '▲' : '▼'}</span>

        {label && labelPosition === 'right' && (
          <span className={styles.label}>{label}</span>
        )}

        {image && imagePosition === 'right' && (
          <img
            src={image}
            className={`${styles.image} ${styles[imageShape]}`}
            alt="collapse"
          />
        )}
      </div>

      {open && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default Collapse;
