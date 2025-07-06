import styles from './Table.module.scss';
import { ReactNode } from 'react';

type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> & {
  children: React.ReactNode;
};
export const Table = {
  Root: ({ children }: { children: ReactNode }) => (
    <div className={styles.wrapper}>
      <table className={styles.table}>{children}</table>
    </div>
  ),

  Header: ({ columns }: { columns: string[] }) => (
    <thead>
      <tr className={styles.header}>
        {columns.map((col, index) => (
          <th key={index} className={styles.cell}>
            {col}
          </th>
        ))}
      </tr>
    </thead>
  ),

  Body: ({ children }: { children: ReactNode }) => <tbody>{children}</tbody>,

  Row: ({ children, ...rest }: TableRowProps) => (
    <tr className={styles.row} {...rest}>
      {children}
    </tr>
  ),

  Cell: ({ children }: { children: ReactNode }) => (
    <td className={styles.cell}>{children}</td>
  ),

  Footer: ({ children }: { children: ReactNode }) => (
    <tfoot>
      <tr>
        <td colSpan={999} className={styles.footer}>
          {children}
        </td>
      </tr>
    </tfoot>
  ),
};
