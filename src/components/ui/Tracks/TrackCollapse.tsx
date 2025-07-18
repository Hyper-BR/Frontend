import { TrackDTO } from '@/services/track/types';
import styles from './TrackCollapse.module.scss';
import Collapse from '@/components/commons/Collapse/Collapse';

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
        <li key={i} className={styles.trackColumnItem}>
          <Collapse
            label={track.title?.trim() !== '' ? track.title : track.file?.name}
            labelPosition="left"
            image={track.coverUrl}
            imagePosition="left"
            imageShape="square"
            size="md"
            onToggle={(isOpen) => {
              if (isOpen) onSelect(i);
            }}
          >
            <p>{`Gênero: ${track.genre}`}</p>
            <p>{`Colaboradores: ${track.artists
              ?.map((a) => a.username)
              .join(', ')}`}</p>
            <p>{`Privacidade: ${track.privacy}`}</p>
            <p>{`Privacidade: ${track.price}`}</p>
          </Collapse>
        </li>
      ))}
    </ul>
  );
};

export default TrackList;
