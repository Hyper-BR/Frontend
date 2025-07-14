import styles from './Input.module.scss';
import clsx from 'clsx';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  width?: 'sm' | 'md' | 'lg';
}

export function Input({
  label,
  error,
  width = 'md',
  className,
  ...props
}: Props) {
  return (
    <label className={clsx(styles[width], error && styles.error)}>
      {label && <span className={styles.label}>{label}</span>}
      <input className={clsx(styles.input, className)} {...props} />
    </label>
  );
}
