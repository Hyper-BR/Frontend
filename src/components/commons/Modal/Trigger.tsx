import { useModal } from '@/contexts/ModalContext';
import { ReactNode } from 'react';

interface Props {
  modal: string;
  children: ReactNode;
}

export function Trigger({ modal, children }: Props) {
  const { openModal } = useModal();

  return (
    <div onClick={() => openModal(modal)} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
}
