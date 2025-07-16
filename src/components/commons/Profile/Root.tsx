import styles from './Profile.module.scss';

export function Root({ children }: { children: React.ReactNode }) {
  return <section className={styles.profile}>{children}</section>;
}
