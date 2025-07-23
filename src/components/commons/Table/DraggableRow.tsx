import styles from './Table.module.scss';
import { ReactNode, HTMLAttributes } from 'react';
import { useDragDrop } from '@/contexts/DragDropProvider';

type Props = HTMLAttributes<HTMLTableRowElement> & {
  id: string;
  title: string;
  children: ReactNode;
  dragType?: string; // tipo opcional, padrão 'row'
};

export function DraggableRow({ id, title, children, dragType = 'row', ...rest }: Props) {
  const { setDraggedType } = useDragDrop();

  return (
    <tr
      className={styles.row}
      draggable
      {...rest}
      onDragStart={(e) => {
        const ghost = document.createElement('div');
        ghost.innerText = title;
        Object.assign(ghost.style, {
          position: 'absolute',
          top: '-9999px',
          padding: '6px 12px',
          background: '#222',
          color: '#fff',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: '500',
          pointerEvents: 'none',
        });
        document.body.appendChild(ghost);
        e.dataTransfer.setDragImage(ghost, 0, 0);
        setTimeout(() => document.body.removeChild(ghost), 0);

        e.dataTransfer.setData(`application/x-${dragType}-id`, id);
        e.dataTransfer.effectAllowed = 'move';

        setDraggedType(dragType);
      }}
      onDragEnd={() => {
        setDraggedType(null);
      }}
    >
      {children}
    </tr>
  );
}
