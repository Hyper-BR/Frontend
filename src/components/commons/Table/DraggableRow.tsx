import styles from './Table.module.scss';
import { ReactNode, HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLTableRowElement> & {
  id: string;
  title: string;
  children: ReactNode;
};

export function DraggableRow({ children, title, id, ...rest }: Props) {
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
        e.dataTransfer.setData('text/plain', id);
        e.dataTransfer.effectAllowed = 'move';
      }}
    >
      {children}
    </tr>
  );
}
