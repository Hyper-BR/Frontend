import styles from './Button.module.scss';
import clsx from 'clsx';
import { forwardRef } from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'muted' | 'black';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      children,
      className,
      type = 'button',
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        type={type}
        ref={ref}
        className={clsx(styles.base, styles[variant], styles[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? '...' : icon ? <span className={styles.icon}>{icon}</span> : null}
        <span>{children}</span>
      </button>
    );
  },
);
