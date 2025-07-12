import styles from './Modal.module.scss';

export function Close({ onClick }: { onClick: () => void }) {
  return (
    <button className={styles.close} onClick={onClick}>
      &times;
    </button>
  );
}
