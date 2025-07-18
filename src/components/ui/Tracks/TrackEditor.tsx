import { Input } from '@/components/commons/Input/Input';
import { Button } from '@/components/commons/Button/Button';
import { ArtistDTO } from '@/services/artist/types';
import { TrackDTO } from '@/services/track/types';
import styles from './TrackEditor.module.scss';
import Select from '../../commons/Select/Select';

interface TrackEditorProps {
  track: TrackDTO;
  index: number;
  onChange: (field: keyof TrackDTO, value: any) => void;
  onArtistRemove: (artistId: string) => void;
  onToggleSearch: () => void;
  showArtistSearch: boolean;
  matchedArtists: ArtistDTO[];
  collaboratorOptions: { value: string; label: string }[];
  onArtistSelect: (selected: ArtistDTO[]) => void;
  searchArtistName: string;
  onSearchInput: (value: string) => void;
}

const TrackEditor: React.FC<TrackEditorProps> = ({
  track,
  index,
  onChange,
  onArtistRemove,
  onToggleSearch,
  showArtistSearch,
  matchedArtists,
  collaboratorOptions,
  onArtistSelect,
  searchArtistName,
  onSearchInput,
}) => {
  return (
    <div className={styles.editor}>
      <Input
        type="text"
        label="Título da faixa"
        value={track.title}
        required
        onChange={(e) => onChange('title', e.target.value)}
      />

      <Input
        type="text"
        label="Gênero"
        value={track.genre}
        onChange={(e) => onChange('genre', e.target.value)}
      />

      <Input
        type="text"
        label="Tags (separadas por vírgula)"
        value={track.tags.join(', ')}
        onChange={(e) =>
          onChange(
            'tags',
            e.target.value
              .split(',')
              .map((tag) => tag.trim())
              .filter(Boolean),
          )
        }
      />

      <div className={styles.privacy}>
        Privacidade
        <Input
          type="radio"
          value="PUBLIC"
          checked={track.privacy === 'PUBLIC'}
          onChange={() => onChange('privacy', 'PUBLIC')}
          label="Público"
        />
        <Input
          type="radio"
          value="PRIVATE"
          checked={track.privacy === 'PRIVATE'}
          onChange={() => onChange('privacy', 'PRIVATE')}
          label="Privado"
        />
      </div>

      {showArtistSearch && (
        <div className={styles.artistSearch}>
          <Select
            value={track.artists.map((artist) => ({
              value: artist.id,
              label: artist.username,
            }))}
            inputValue={searchArtistName}
            onInputChange={onSearchInput}
            onChange={(selectedOptions) => {
              const selected = selectedOptions
                .map((opt) => matchedArtists.find((a) => a.id === opt.value))
                .filter(Boolean) as ArtistDTO[];
              onArtistSelect(selected);
            }}
            options={collaboratorOptions}
          />
        </div>
      )}

      <Button variant="ghost" onClick={onToggleSearch}>
        + Colaboradores
      </Button>
    </div>
  );
};

export default TrackEditor;
