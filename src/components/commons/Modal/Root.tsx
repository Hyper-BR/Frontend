import styles from './Modal.module.scss';
import { ReactNode } from 'react';
import { ModalSize } from './types';
import { useModal } from '@/contexts/ModalContext';
import { Button } from '../Button/Button';

interface Props {
  children: ReactNode;
  modal: string;
  size?: ModalSize;
  onClose: () => void;
}

export function Root({ children, modal, size = 'md', onClose }: Props) {
  const { isOpen, closeModal } = useModal();
  if (!isOpen(modal)) return null;

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${styles[size]}`}>
        <Button variant="ghost" className={styles.close} onClick={onClose}>
          &times;
        </Button>
        {children}
      </div>
    </div>
  );
}
