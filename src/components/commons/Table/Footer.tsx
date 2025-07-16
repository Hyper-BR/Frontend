import styles from './Table.module.scss';
import { ReactNode } from 'react';

export function Footer({ children }: { children: ReactNode }) {
  return (
    <tfoot>
      <tr>
        <td colSpan={999} className={styles.footer}>
          {children}
        </td>
      </tr>
    </tfoot>
  );
}
