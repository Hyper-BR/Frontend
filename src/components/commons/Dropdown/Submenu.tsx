import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from './Dropdown.module.scss';

interface Props {
  label: string;
  children: React.ReactNode;
}

export function Submenu({ label, children }: Props) {
  return (
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger className={styles.item}>
        {label}
        ...
      </DropdownMenu.SubTrigger>

      <DropdownMenu.Portal>
        <DropdownMenu.SubContent
          className={styles.submenu}
          sideOffset={4}
          alignOffset={-5}
        >
          {children}
        </DropdownMenu.SubContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Sub>
  );
}
