import SelectReact from 'react-select';
import './SelectArtist.scss';

export interface SelectProps {
  value: { value: string; label: string }[];
  inputValue?: string;
  onInputChange?: (value: string) => void;
  onChange: (selectedOptions: { value: string; label: string }[]) => void;
  options: { value: string; label: string }[];
}

const SelectArtist: React.FC<SelectProps> = ({
  value,
  inputValue,
  onInputChange,
  onChange,
  options,
}) => {
  return (
    <SelectReact
      value={value}
      inputValue={inputValue}
      onInputChange={onInputChange}
      onChange={onChange}
      options={options}
      placeholder="Busque artistas que participaram da faixa"
      noOptionsMessage={() =>
        inputValue.length < 2
          ? 'Digite pelo menos 2 letras'
          : 'Nenhum artista encontrado'
      }
      isMulti
      isClearable
      isSearchable
      classNamePrefix="react-select"
    />
  );
};

export default SelectArtist;
