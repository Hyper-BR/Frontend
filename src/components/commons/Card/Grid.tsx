import styles from './Card.module.scss';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  minColumnWidth?: number;
  gap?: string;
  className?: string;
}

export function Grid({ children, minColumnWidth = 150, className }: Props) {
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${minColumnWidth}px, 1fr))`,
      }}
      className={`${styles.grid} ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
