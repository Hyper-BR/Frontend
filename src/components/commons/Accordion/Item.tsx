import styles from './Accordion.module.scss';

interface ItemProps {
  id: string;
  title: string;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  children: React.ReactNode;
}

export const Item: React.FC<ItemProps> = ({
  id,
  title,
  activeId,
  setActiveId,
  children,
}) => {
  const isOpen = activeId === id;

  return (
    <div className={styles.item}>
      <div
        className={styles.header}
        onClick={() => setActiveId(isOpen ? null : id)}
      >
        <span>{title}</span>
        <span>{isOpen ? '−' : '+'}</span>
      </div>

      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
};
