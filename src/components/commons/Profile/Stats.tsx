import styles from './Profile.module.scss';

interface Props {
  stats: { followers: string; following: string };
  analytics?: { plays: string };
}

export function Stats({ stats, analytics }: Props) {
  return (
    <>
      <div className={styles.stats}>
        <span>
          <strong>{stats.followers || '0'}</strong> seguidores
        </span>
        <span>
          <strong>{stats.following || '0'}</strong> seguindo
        </span>
      </div>
      {analytics && (
        <div className={styles.analytics}>
          <span>Reproduções: {analytics.plays}</span>
        </div>
      )}
    </>
  );
}
