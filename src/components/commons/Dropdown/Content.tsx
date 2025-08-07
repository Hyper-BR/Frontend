import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from './Dropdown.module.scss';

interface Props {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end';
  side?: 'bottom' | 'left' | 'right' | 'top';
}

export function Content({ children, size = 'md', align = 'center', side = 'bottom' }: Props) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className={`${styles.menu} ${styles[size]} content`}
        sideOffset={8}
        align={align}
        side={side}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}
