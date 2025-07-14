import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from './Dropdown.module.scss';

interface Props {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Content({ children, size = 'md' }: Props) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className={`${styles.menu} ${styles[size]}`}
        sideOffset={8}
        align="start"
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}
