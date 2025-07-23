import { ReactNode, KeyboardEvent } from 'react';
import styles from './Insights.module.scss';

interface Props {
  title: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function SummaryCard({ title, value, icon, className, onClick }: Props) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`${styles.card} ${className ?? ''}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}
