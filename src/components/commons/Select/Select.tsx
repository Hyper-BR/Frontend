import SelectReact from 'react-select';

export interface SelectProps {
  value: { value: string; label: string }[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onChange: (selectedOptions: { value: string; label: string }[]) => void;
  options: { value: string; label: string }[];
}

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: '#191919',
    borderColor: state.isFocused ? '#00C2FF' : '#444',
    boxShadow: state.isFocused ? '0 0 0 1px #00C2FF' : 'none',
    '&:hover': { borderColor: '#00C2FF' },
    color: '#fff',
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: '#191919',
    color: '#fff',
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: '#00C2FF22',
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: '#00C2FF',
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: '#00C2FF',
    ':hover': { backgroundColor: '#00C2FF33', color: '#fff' },
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? '#00C2FF33' : 'transparent',
    color: '#fff',
    cursor: 'pointer',
  }),
  placeholder: (base: any) => ({
    ...base,
    color: '#888',
  }),
  singleValue: (base: any) => ({
    ...base,
    color: '#fff',
  }),
};

const Select: React.FC<SelectProps> = ({
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
      placeholder="Buscar colaboradores..."
      noOptionsMessage={() =>
        inputValue.length < 2
          ? 'Digite pelo menos 2 letras'
          : 'Nenhum artista encontrado'
      }
      isMulti
      isClearable
      isSearchable
      classNamePrefix="react-select"
      styles={customStyles}
    />
  );
};

export default Select;
