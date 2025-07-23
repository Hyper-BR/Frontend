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
  const { hoveredTargetId, setHoveredTargetId, handleDrop, draggedType, setDraggedType } = useDragDrop();

  const isHovered = hoveredTargetId === entityId;

  const isDropEnabled = droppable && draggedType === 'track';

  return (
    <div
      className={className}
      draggable={draggable}
      onDragStart={
        draggable
          ? (e) => {
              e.dataTransfer.setData('application/x-track-id', entityId);
              setDraggedType('track');
            }
          : undefined
      }
      onDragEnd={draggable ? () => setDraggedType(null) : undefined}
      onDragOver={
        isDropEnabled
          ? (e) => {
              e.preventDefault();
              setHoveredTargetId(entityId);
            }
          : undefined
      }
      onDragLeave={isDropEnabled ? () => setHoveredTargetId(null) : undefined}
      onDrop={
        isDropEnabled
          ? (e) => {
              e.preventDefault();
              const draggedId = e.dataTransfer.getData('application/x-track-id');
              if (!draggedId) return;
              handleDrop(draggedId, entityId);
            }
          : undefined
      }
      style={{
        outline: isHovered ? '1px dashed red' : undefined,
        borderRadius: '6px',
        transition: 'all 0s ease-in-out',
        opacity: droppable && draggedType && draggedType !== 'track' ? 0.4 : 1,
        pointerEvents: droppable && draggedType && draggedType !== 'track' ? 'none' : 'auto',
      }}
    >
      {children}
    </div>
  );
}
