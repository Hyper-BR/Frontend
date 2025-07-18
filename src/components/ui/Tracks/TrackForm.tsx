import { Input } from '@/components/commons/Input/Input';
import { ArtistDTO } from '@/services/artist/types';
import { TrackDTO } from '@/services/track/types';
import SelectArtist from '@/components/ui/Select/SelectArtist';
import Select from '@/components/commons/Select/Select';
import { Radio } from '@/components/commons/Radio/Radio';

import styles from './TrackForm.module.scss';
interface TrackFormProps {
  track: TrackDTO;
  onChange: (field: keyof TrackDTO, value: any) => void;
  matchedArtists: ArtistDTO[];
  collaboratorOptions: { value: string; label: string }[];
  onArtistSelect: (selected: ArtistDTO[]) => void;
  searchArtistName: string;
  onSearchInput: (value: string) => void;
}

const TrackForm: React.FC<TrackFormProps> = ({
  track,
  onChange,
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

      <div className={styles.releaseType}>
        <div className={styles.genre}>
          <Input
            type="text"
            label="Gênero"
            value={track.genre}
            onChange={(e) => onChange('genre', e.target.value)}
          />
        </div>
      </div>

      <Input
        type="text"
        placeholder="Insira tags separadas por vírgula"
        label="Tags"
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

      <div className={styles.artistSearch}>
        <SelectArtist
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

      <div className={styles.privacy}>
        Privacidade
        <Radio
          value="PUBLIC"
          checked={track.privacy === 'PUBLIC'}
          onChange={() => onChange('privacy', 'PUBLIC')}
          label="Público"
        />
        <Radio
          value="PRIVATE"
          checked={track.privacy === 'PRIVATE'}
          onChange={() => onChange('privacy', 'PRIVATE')}
          label="Privado"
        />
      </div>
    </div>
  );
};

export default TrackForm;
