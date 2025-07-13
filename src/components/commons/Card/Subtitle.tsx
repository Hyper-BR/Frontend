import styles from './Card.module.scss';

interface Props {
  text: string;
  onClick?: () => void;
}

export function Subtitle({ text, onClick }: Props) {
  return (
    <span className={styles.subtitle} onClick={onClick}>
      {text}
    </span>
  );
}
