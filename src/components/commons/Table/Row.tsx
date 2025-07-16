import styles from './Table.module.scss';
import { ReactNode, HTMLAttributes } from 'react';

export function Row({
  children,
  ...rest
}: HTMLAttributes<HTMLTableRowElement> & { children: ReactNode }) {
  return (
    <tr className={styles.row} {...rest}>
      {children}
    </tr>
  );
}
