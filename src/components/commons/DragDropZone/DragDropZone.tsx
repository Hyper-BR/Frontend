import { ReactNode } from 'react';
import { useDragDrop } from '@/contexts/DragDropProvider';

interface Props {
  children: ReactNode;
  entityId: string;
  draggable?: boolean;
  droppable?: boolean;
  className?: string;
}

export function DragDropZone({ children, entityId, draggable = false, droppable = false, className }: Props) {
  const { hoveredTargetId, setHoveredTargetId, handleDrop } = useDragDrop();
  const isHovered = hoveredTargetId === entityId;

  return (
    <div
      className={className}
      draggable={draggable}
      onDragStart={
        draggable
          ? (e) => {
              e.dataTransfer.setData('application/x-track-id', entityId);
            }
          : undefined
      }
      onDragOver={
        droppable
          ? (e) => {
              e.preventDefault();
              setHoveredTargetId(entityId);
            }
          : undefined
      }
      onDragLeave={droppable ? () => setHoveredTargetId(null) : undefined}
      onDrop={
        droppable
          ? (e) => {
              e.preventDefault();
              const draggedId = e.dataTransfer.getData('application/x-track-id');
              if (!draggedId) return;
              handleDrop(draggedId, entityId);
            }
          : undefined
      }
      style={{
        outline: isHovered ? 'dashed red' : undefined,
        borderRadius: '6px',
        transition: 'ease-in-out',
      }}
    >
      {children}
    </div>
  );
}
