import styles from './Modal.module.scss';

interface FooterButton {
  label: string;
  onClick: () => void;
  type?: 'button' | 'submit';
  loading?: boolean;
  disabled?: boolean;
  variant?: 'ghost' | 'primary' | 'custom';
  className?: string;
}

interface Props {
  submitButton?: FooterButton;
  cancelButton?: FooterButton;
  leftButton?: FooterButton;
}

export function Footer({ submitButton, cancelButton, leftButton }: Props) {
  return (
    <div className={styles.footer}>
      <div className={styles.leftActions}>
        {leftButton && (
          <button
            type={leftButton.type || 'button'}
            className={leftButton.className || styles.addTrackButton}
            onClick={leftButton.onClick}
            disabled={leftButton.disabled}
          >
            {leftButton.label}
          </button>
        )}
      </div>

      <div className={styles.rightActions}>
        {cancelButton && (
          <button
            type={cancelButton.type || 'button'}
            className={cancelButton.className || styles.cancelGhost}
            onClick={cancelButton.onClick}
            disabled={cancelButton.disabled}
          >
            {cancelButton.label}
          </button>
        )}

        {submitButton && (
          <button
            type={submitButton.type || 'button'}
            className={submitButton.className || styles.uploadButton}
            onClick={submitButton.onClick}
            disabled={submitButton.disabled || submitButton.loading}
          >
            {submitButton.loading ? 'Enviando...' : submitButton.label}
          </button>
        )}
      </div>
    </div>
  );
}
