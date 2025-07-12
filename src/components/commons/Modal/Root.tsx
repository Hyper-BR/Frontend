import styles from './Modal.module.scss';
import { ReactNode } from 'react';
import { ModalSize } from './types';
import { useModal } from '@/contexts/ModalContext';

interface Props {
  children: ReactNode;
  modal: string;
  size?: ModalSize;
}

export function Root({ children, modal, size = 'md' }: Props) {
  const { isOpen, closeModal } = useModal();
  if (!isOpen(modal)) return null;

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${styles[size]}`}>
        <button className={styles.close} onClick={closeModal}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
