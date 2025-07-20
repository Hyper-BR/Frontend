interface Props {
  children: React.ReactNode;
}

export function Title({ children }: Props) {
  return <span>{children}</span>;
}
