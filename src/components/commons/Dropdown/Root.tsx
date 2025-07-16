import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export function Root({ children }: { children: React.ReactNode }) {
  return <DropdownMenu.Root>{children}</DropdownMenu.Root>;
}
