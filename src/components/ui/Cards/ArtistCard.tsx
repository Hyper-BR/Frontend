import { Card } from '@/components/commons/Card';
import { ArtistLink } from '@/components/commons/Link/ArtistLink';
import { ArtistDTO } from '@/services/artist/types';

interface Props {
  artist: ArtistDTO;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'square' | 'round';
  align?: 'left' | 'center';
  direction?: 'row' | 'column';
}

export function ArtistCard({ artist, size = 'md', direction = 'row' }: Props) {
  return (
    <Card.Root imageUrl={artist.avatarUrl} shape="round" size={size} clickable align="center" direction={direction}>
      <Card.Title>
        <ArtistLink name={artist.username} id={artist.id} onClick={() => {}} size="lg" />
      </Card.Title>
    </Card.Root>
  );
}
