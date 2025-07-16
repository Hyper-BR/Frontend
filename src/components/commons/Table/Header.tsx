import styles from './Table.module.scss';

export function Header({ columns }: { columns: string[] }) {
  return (
    <thead>
      <tr className={styles.header}>
        {columns.map((col, i) => (
          <th key={i} className={styles.cell}>
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}
