import { Root } from '@/components/commons/Card/Root';
import { Title } from '@/components/commons/Card/Title';

interface Props {
  name: string;
  imageUrl: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function ArtistCard({ name, imageUrl, onClick, size = 'md' }: Props) {
  return (
    <Root
      imageUrl={imageUrl}
      shape="round"
      size={size}
      clickable
      onClick={onClick}
      align="center"
    >
      <Title text={name} onClick={onClick} color="primary" />
    </Root>
  );
}
