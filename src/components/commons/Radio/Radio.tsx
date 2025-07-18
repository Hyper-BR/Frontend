import clsx from 'clsx';
import styles from './radio.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  width?: 'sm' | 'md' | 'lg';
  id?: string;
}

export function Radio({
  label,
  error,
  width = 'md',
  id,
  className,
  ...props
}: Props) {
  return (
    <div className={clsx(styles.radio, styles[width], error && styles.error)}>
      <label className={styles.wrapper}>
        <input id={label} type="radio" className={clsx(className)} {...props} />
        {label && <span className={styles.label}>{label}</span>}
      </label>
    </div>
  );
}
