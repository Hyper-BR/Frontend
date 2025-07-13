import { Root } from '@/components/commons/Card/Root';
import { Button } from '@/components/commons/Button/Button';
import { Title } from '@/components/commons/Card/Title';
import { Subtitle } from '@/components/commons/Card/Subtitle';
import styles from './Track.module.scss';

interface Props {
  name: string;
  artists: string;
  imageUrl: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function Track({
  name,
  artists,
  imageUrl,
  onClick,
  size = 'md',
}: Props) {
  return (
    <Root
      imageUrl={imageUrl}
      shape="square"
      size={size}
      clickable
      onClick={onClick}
      align="center"
    >
      <div className={styles.imageWrapper}>
        <Button
          className={styles.playButton}
          variant="transparent"
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          }
          onClick={onClick}
        />
      </div>

      <Title text={name} />
      <Subtitle text={artists} />
    </Root>
  );
}
