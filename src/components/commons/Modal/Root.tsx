import styles from './Modal.module.scss';
import { ReactNode } from 'react';
import { useModal } from '@/contexts/ModalContext';
import { Button } from '../Button/Button';

interface Props {
  children: ReactNode;
  modal: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fit';
  onClose: () => void;
}

export function Root({ children, modal, size = 'md', onClose }: Props) {
  const { isOpen } = useModal();
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
