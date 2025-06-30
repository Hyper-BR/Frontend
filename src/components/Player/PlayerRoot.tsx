import { HTMLAttributes, ReactNode } from 'react';
import { Card } from '@nextui-org/react';

import './styles.scss';

interface PlayerRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const PlayerRoot = ({ children }: PlayerRootProps) => {
  return (
    <div className="player w-full">
      {/* <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50"
        shadow="sm"
      >
        {children}
      </Card> */}
    </div>
  );
};
