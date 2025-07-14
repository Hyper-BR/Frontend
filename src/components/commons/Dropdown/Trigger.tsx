import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from './Dropdown.module.scss';

export function Trigger({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu.Trigger asChild className={styles.trigger}>
      {children}
    </DropdownMenu.Trigger>
  );
}
