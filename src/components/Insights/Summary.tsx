import { ReactNode } from 'react';
import styles from './Insights.module.scss';

interface Props {
  title: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
}

export function SummaryCard({ title, value, icon, className }: Props) {
  return (
    <div className={`${styles.card} ${className ?? ''}`}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}
