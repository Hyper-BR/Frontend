import { createContext, useContext, useState, ReactNode } from 'react';

interface DragDropContextValue {
  hoveredTargetId: string | null;
  setHoveredTargetId: (id: string | null) => void;

  draggedType: string | null;
  setDraggedType: (type: string | null) => void;

  handleDrop: (draggedId: string, targetId: string) => void;
  setDropHandler: (fn: (draggedId: string, targetId: string) => void) => void;
}

const DragDropContext = createContext<DragDropContextValue | undefined>(undefined);

export function DragDropProvider({ children }: { children: ReactNode }) {
  const [hoveredTargetId, setHoveredTargetId] = useState<string | null>(null);
  const [draggedType, setDraggedType] = useState<string | null>(null);
  const [dropHandler, setDropHandlerInternal] = useState<((draggedId: string, targetId: string) => void) | null>(null);

  const setDropHandler = (fn: (draggedId: string, targetId: string) => void) => {
    setDropHandlerInternal(() => fn);
  };

  const handleDrop = (draggedId: string, targetId: string) => {
    dropHandler?.(draggedId, targetId);
    setHoveredTargetId(null);
    setDraggedType(null); // limpa após drop
  };

  return (
    <DragDropContext.Provider
      value={{
        hoveredTargetId,
        setHoveredTargetId,
        draggedType,
        setDraggedType,
        handleDrop,
        setDropHandler,
      }}
    >
      {children}
    </DragDropContext.Provider>
  );
}

export function useDragDrop() {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error('useDragDrop must be used within a DragDropProvider');
  }
  return context;
}
