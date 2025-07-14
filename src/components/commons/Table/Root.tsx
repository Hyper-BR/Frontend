import styles from './Table.module.scss';
import { ReactNode } from 'react';

export function Root({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>{children}</table>
    </div>
  );
}
