import clsx from 'clsx';
import { TrackDTO } from '@/services/track/types';
import styles from './TrackList.module.scss';

interface TrackListProps {
  tracks: TrackDTO[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const TrackList: React.FC<TrackListProps> = ({
  tracks,
  activeIndex,
  onSelect,
}) => {
  return (
    <ul className={styles.trackColumnList}>
      {tracks.map((track, i) => (
        <li
          key={i}
          className={clsx(
            styles.trackColumnItem,
            i === activeIndex && styles.active,
          )}
          onClick={() => onSelect(i)}
        >
          {track.title?.trim() !== '' ? track.title : track.file?.name}
        </li>
      ))}
    </ul>
  );
};

export default TrackList;
