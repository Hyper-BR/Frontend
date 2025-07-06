import styles from './Table.module.scss';
import { ReactNode } from 'react';

export const Table = {
  Root: ({ children }: { children: ReactNode }) => (
    <div className={styles.root}>{children}</div>
  ),

  Header: ({ columns }: { columns: string[] }) => (
    <div className={styles.header}>
      {columns.map((col, index) => (
        <span key={index} className={styles.cell}>
          {col}
        </span>
      ))}
    </div>
  ),

  Body: ({ children }: { children: ReactNode }) => (
    <ul className={styles.body}>{children}</ul>
  ),

  Row: ({ children }: { children: ReactNode }) => (
    <li className={styles.row}>{children}</li>
  ),

  Cell: ({ children }: { children: ReactNode }) => (
    <div className={styles.cell}>{children}</div>
  ),

  Footer: ({ children }: { children: ReactNode }) => (
    <div className={styles.footer}>{children}</div>
  ),
};
