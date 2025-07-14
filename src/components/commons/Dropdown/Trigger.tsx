import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export function Trigger({ children }: { children: React.ReactNode }) {
  return <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>;
}
