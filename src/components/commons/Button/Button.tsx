import styles from './Button.module.scss';
import clsx from 'clsx';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'transparent';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className,
  ...props
}: Props) {
  return (
    <button
      className={clsx(styles.base, styles[variant], styles[size], className)}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? (
        '...'
      ) : icon ? (
        <span className={styles.icon}>{icon}</span>
      ) : null}
      <span>{children}</span>
    </button>
  );
}
