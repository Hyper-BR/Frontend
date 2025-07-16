import { ReactNode } from 'react';
import styles from './Modal.module.scss';

export function Content({ children }: { children: ReactNode }) {
  return <section className={styles.content}>{children}</section>;
}
