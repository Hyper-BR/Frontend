import { Button } from '../Button/Button';
import styles from './Modal.module.scss';

export function Close({ onClick }: { onClick: () => void }) {
  return (
    <Button className={styles.close} onClick={onClick}>
      &times;
    </Button>
  );
}
