import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import styles from './Card.module.scss';

interface Props {
  text: string;
  href?: string;
  onClick?: () => void;
  color?: 'default' | 'primary';
}

export function Title({ text, href, onClick, color = 'default' }: Props) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
  };

  const className = clsx(styles.title, color === 'primary' && styles.primary);

  return href ? (
    <Link to={href} onClick={handleClick} className={className}>
      {text}
    </Link>
  ) : (
    <span onClick={handleClick} className={className}>
      {text}
    </span>
  );
}
