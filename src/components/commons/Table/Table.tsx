import styles from './Table.module.scss';
import { ReactNode } from 'react';

type TableDraggableRowProps = React.HTMLAttributes<HTMLTableRowElement> & {
  id: string;
  title: string;
  children: ReactNode;
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
        {columns.map((col, i) => (
          <th key={i} className={styles.cell}>
            {col}
          </th>
        ))}
      </tr>
    </thead>
  ),

  Body: ({ children }: { children: ReactNode }) => <tbody>{children}</tbody>,

  Row: ({
    children,
    ...rest
  }: React.HTMLAttributes<HTMLTableRowElement> & { children: ReactNode }) => (
    <tr className={styles.row} {...rest}>
      {children}
    </tr>
  ),

  DraggableRow: ({ children, title, id, ...rest }: TableDraggableRowProps) => (
    <tr
      className={styles.row}
      draggable
      {...rest}
      onDragStart={(e) => {
        const ghost = document.createElement('div');
        ghost.innerText = title;
        Object.assign(ghost.style, {
          position: 'absolute',
          top: '-9999px',
          padding: '6px 12px',
          background: '#222',
          color: '#fff',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: '500',
          pointerEvents: 'none',
        });
        document.body.appendChild(ghost);
        e.dataTransfer.setDragImage(ghost, 0, 0);
        setTimeout(() => document.body.removeChild(ghost), 0);

        e.dataTransfer.setData('text/plain', id);
        e.dataTransfer.effectAllowed = 'move';
      }}
    >
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
