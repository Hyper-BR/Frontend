import { Button } from '../Button/Button';
import styles from './Modal.module.scss';

interface Props {
  leftButton?: React.ReactNode;
  cancelButton?: React.ReactNode;
  submitButton?: React.ReactNode;
}

export function Footer({ submitButton, cancelButton, leftButton }: Props) {
  return (
    <div className={styles.footer}>
      <div className={styles.leftActions}>{leftButton}</div>

      <div className={styles.rightActions}>
        {cancelButton}
        {submitButton}
      </div>
    </div>
  );
}
