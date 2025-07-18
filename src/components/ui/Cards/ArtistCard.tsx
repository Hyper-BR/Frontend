import { Card } from '@/components/commons/Card';
import { useAuth } from '@/hooks/useAuth';
import { ArtistDTO } from '@/services/artist/types';

interface Props {
  artist: ArtistDTO;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'square' | 'round';
  align?: 'left' | 'center';
  direction?: 'row' | 'column';
}

export function ArtistCard({
  artist,
  size = 'md',
  direction = 'row',
  shape = 'square',
  align,
}: Props) {
  return (
    <Card.Root
      imageUrl={artist.avatarUrl}
      shape="round"
      size={size}
      clickable
      align="center"
      direction={direction}
    >
      <Card.Title
        text={artist.username}
        href={`/artist/${artist.id}`}
        color="primary"
      />
    </Card.Root>
  );
}
