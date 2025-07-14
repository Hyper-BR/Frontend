import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from './Dropdown.module.scss';

export function Content({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className={styles.menu}
        sideOffset={8}
        align="start"
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}
