import { Button, Card, Image, Link } from '@nextui-org/react';
import { CardBody } from '@nextui-org/react';
import { useStore } from '../../store/useStore';
import { getFileTrackById } from '../../services/track';
import { TrackDTO, TrackPageDTO } from '../../services/track/types';

import './styles.scss';
import { PlusIcon } from '../Icons/PlusIcon';
import { NextIcon } from '../Icons/NextIcon';

interface cardTrackProps {
  data: TrackPageDTO;
  height: number;
  width: number;
}

export const CardTrack = ({ data, height, width }: cardTrackProps) => {
  const { setPlayTrack } = useStore();

  async function playTrackById(item: TrackDTO) {
    try {
      const url = await getFileTrackById(item.id);

      item.path = url.data;

      setPlayTrack(item);
    } catch (error) {
      console.log('Error play Track', error);
    }
  }

  async function addToPlaylist(item: TrackDTO) {
    try {
      console.log(item);
    } catch (error) {
      console.log('Error play Track', error);
    }
  }

  return (
    <div className="card_track">
      {data !== null
        ? data.tracks.map((item: TrackDTO) => (
            <Card>
              <CardBody>
                <div className="card_track_body flex">
                  <Image
                    className="object-cover"
                    height={height}
                    width={width}
                    src={'https://i.pravatar.cc/150?u=a04258114e29026702d'}
                  />
                  <Button
                    size="sm"
                    isIconOnly
                    className="data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                    onClick={() => addToPlaylist(item)}
                  >
                    <PlusIcon size={20} />
                  </Button>
                  <Button
                    size="sm"
                    isIconOnly
                    className="data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                    onClick={() => playTrackById(item)}
                  >
                    <NextIcon size={20} />
                  </Button>
                  <div className="card_info">
                    <div>
                      {/* <Link color="foreground" href={'/'}> */}
                      {item.name}
                      {/* </Link> */}
                    </div>
                    <div>
                      {/* <Link */}
                      {/* size="sm"
                        color="danger"
                        href={`/artist/${item.artist.username}`}
                      > */}
                      {item.artist.username}
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        : 'Erro ao retornar artistas'}
    </div>
  );
};
