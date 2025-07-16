import styles from './Modal.module.scss';

interface Props {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: Props) {
  return (
    <header className={styles.header}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}
