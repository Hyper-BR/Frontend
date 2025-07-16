import { Link } from 'react-router-dom';
import styles from './Card.module.scss';

interface Props {
  text: string;
  href?: string;
  onClick?: () => void;
  color?: 'default' | 'primary';
}

export function Title({ text, href, onClick, color = 'default' }: Props) {
  const className = `${styles.title} ${
    color === 'primary' ? styles.primary : ''
  }`;

  return href ? (
    <Link
      to={href}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={className}
    >
      {text}
    </Link>
  ) : (
    <span
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      {text}
    </span>
  );
}
