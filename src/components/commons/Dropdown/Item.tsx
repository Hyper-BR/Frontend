import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from './Dropdown.module.scss';
import { buildFullUrl } from '@/utils/buildFullUrl';

interface Props {
  children: React.ReactNode | string;
  onSelect?: () => void;
  disabled?: boolean;
  rightIcon?: React.ReactNode;
  leftImage?: string;
  onClick?: () => void;
  className?: string;
}

export function Item({ children, onSelect, disabled, rightIcon, onClick, leftImage, className }: Props) {
  return (
    <DropdownMenu.Item
      className={`${styles.item} ${className ?? ''}`}
      onSelect={onSelect}
      disabled={disabled}
      onClick={onClick}
    >
      {leftImage && <img className={styles.image} src={buildFullUrl(leftImage)} />}
      {children}
      {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
    </DropdownMenu.Item>
  );
}
