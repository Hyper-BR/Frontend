import { Card, CardBody } from '@nextui-org/react';
import { Label } from '../Label/Label';
import { Avatar } from '../Avatar';
import { ArtistDTO, ArtistPageDTO } from '../../services/artist/types';
import './styles.scss';

interface cardArtistProps {
  data: ArtistPageDTO;
}

export const CardArtist = ({ data }: cardArtistProps) => {
  return (
    <div className="card_artist">
      {data !== null
        ? data.artists.map((item: ArtistDTO) => (
            <Card>
              <CardBody className="flex aspect-square items-center justify-center">
                <Avatar.Root>
                  <Avatar.User key={item.id} />
                </Avatar.Root>
                <Label>{item.username}</Label>
              </CardBody>
            </Card>
          ))
        : 'Erro ao retornar artistas'}
    </div>
  );
};
