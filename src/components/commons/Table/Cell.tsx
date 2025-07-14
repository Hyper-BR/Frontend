import styles from './Table.module.scss';
import { ReactNode } from 'react';

export function Cell({ children }: { children: ReactNode }) {
  return <td className={styles.cell}>{children}</td>;
}
