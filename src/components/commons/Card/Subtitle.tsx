import { Link } from 'react-router-dom';
import styles from './Card.module.scss';

interface Props {
  items: {
    text: string;
    href: string;
    onClick?: () => void;
  }[];
}

export function Subtitle({ items }: Props) {
  return (
    <div className={styles.subtitle}>
      {items.map((item, index) => (
        <span key={item.href + index}>
          <Link
            to={item.href}
            className={styles.subtitleLink}
            onClick={(e) => {
              e.stopPropagation();
              item.onClick?.();
            }}
          >
            {item.text}
          </Link>

          {index < items.length - 1 && ', '}
        </span>
      ))}
    </div>
  );
}
