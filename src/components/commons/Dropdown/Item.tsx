import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from './Dropdown.module.scss';

interface Props {
  label: string;
  onSelect?: () => void;
  disabled?: boolean;
  rightIcon?: React.ReactNode;
  className?: string;
}

export function Item({
  label,
  onSelect,
  disabled,
  rightIcon,
  className,
}: Props) {
  return (
    <DropdownMenu.Item
      className={`${styles.item} ${className ?? ''}`}
      onSelect={onSelect}
      disabled={disabled}
    >
      {label}
      {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
    </DropdownMenu.Item>
  );
}
