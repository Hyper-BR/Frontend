import { createContext, useContext, useState, ReactNode } from 'react';

export type ModalId = string | null;

interface ModalContextType {
  openModal: (id: string) => void;
  closeModal: () => void;
  isOpen: (id: string) => boolean;
  current: ModalId;
}

const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
  isOpen: () => false,
  current: null,
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<ModalId>(null);
  const openModal = (id: string) => setCurrent(id);
  const closeModal = () => setCurrent(null);
  const isOpen = (id: string) => current === id;

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen, current }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
