import { Card } from '@/components/commons/Card';
import { ArtistLink } from '@/components/commons/Link/ArtistLink';
import { ArtistDTO } from '@/services/artist/types';
import { useNavigate } from 'react-router-dom';

interface Props {
  artist: ArtistDTO;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'square' | 'round';
  align?: 'left' | 'center';
  direction?: 'row' | 'column';
  linkSize?: 'sm' | 'md' | 'lg';
}

export function ArtistCard({ artist, size = 'md', direction = 'row', linkSize = 'md' }: Props) {
  const navigate = useNavigate();

  return (
    <Card.Root
      imageUrl={artist.avatarUrl}
      shape="round"
      size={size}
      clickable
      align="center"
      direction={direction}
      onClick={() => navigate(`/artist/${artist.id}`)}
    >
      <Card.Title>
        <ArtistLink name={artist.username} id={artist.id} size={linkSize} />
      </Card.Title>
    </Card.Root>
  );
}
