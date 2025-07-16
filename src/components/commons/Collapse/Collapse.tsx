import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './Collapse.module.scss';
import { Button } from '@/components/commons/Button/Button';

interface Props {
  title: string;
  children: React.ReactNode;
  isOpenByDefault?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const Collapse = ({
  title,
  children,
  isOpenByDefault = false,
  icon,
  className,
}: Props) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  return (
    <div className={clsx(styles.wrapper, className)}>
      <button
        className={styles.header}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.title}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {title}
        </span>
        <span className={styles.toggle}>{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
};
