import styles from './Card.module.scss';

interface Props {
  text: string;
  onClick?: () => void;
  color?: 'default' | 'primary';
}

export function Title({ text, onClick, color = 'default' }: Props) {
  return (
    <span
      className={`${styles.title} ${color === 'primary' ? styles.primary : ''}`}
      onClick={onClick}
    >
      {text}
    </span>
  );
}
