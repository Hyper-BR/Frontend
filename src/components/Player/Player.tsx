import React from 'react';
import { Card, CardBody, Image, Button, Slider } from '@nextui-org/react';
import { HeartIcon } from './HeartIcon';
import { PauseCircleIcon } from './PauseCircleIcon';
import { NextIcon } from './NextIcon';
import { PreviousIcon } from './PreviousIcon';
import { RepeatOneIcon } from './RepeatOneIcon';
import { ShuffleIcon } from './ShuffleIcon';

import './styles.scss';

export const Player = () => {
  const [liked, setLiked] = React.useState(false);

  return (
    <div className="player w-full">
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50"
        shadow="sm"
      >
        <CardBody>
          <div className="items-center justify-center flex">
            <div className="track_image">
              <Image
                className="object-cover"
                shadow="md"
                src="https://www.adb.inf.br/ach/app01/index.php?p=digitallibrary/getfile&id=7196&preview=long"
                width={100}
              />
            </div>
            <div className="flex w-full">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <h1 className="text-large font-medium mt-2">TRACK NAME</h1>
                  <p className="text-small text-foreground/80">ARTIST</p>
                </div>
                <Button
                  isIconOnly
                  className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                  radius="full"
                  variant="light"
                  onPress={() => setLiked((v) => !v)}
                >
                  <HeartIcon
                    className={liked ? '[&>path]:stroke-transparent' : ''}
                    fill={liked ? 'currentColor' : 'none'}
                  />
                </Button>
              </div>

              <div className="w-full">
                <div className="button_section">
                  <div className="flex w-full justify-center">
                    <Button
                      isIconOnly
                      className="data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                    >
                      <RepeatOneIcon className="text-foreground/80" />
                    </Button>
                    <Button
                      isIconOnly
                      className="data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                    >
                      <PreviousIcon />
                    </Button>
                    <Button
                      isIconOnly
                      className="w-auto h-auto data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                    >
                      <PauseCircleIcon size={54} />
                    </Button>
                    <Button
                      isIconOnly
                      className="data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                    >
                      <NextIcon />
                    </Button>
                    <Button
                      isIconOnly
                      className="data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                    >
                      <ShuffleIcon className="text-foreground/80" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col">
                  <Slider
                    classNames={{
                      track: 'bg-default-500/30',
                      thumb: 'w-2 h-2 after:w-2 after:h-2 after:bg-foreground',
                    }}
                    color="foreground"
                    defaultValue={33}
                    size="sm"
                  />
                  <div className="flex justify-between">
                    <p className="text-small">1:23</p>
                    <p className="text-small text-foreground/50">4:32</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
