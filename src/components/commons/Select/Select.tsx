import SelectReact from 'react-select';
import './Select.scss';

export interface SelectProps {
  value: { value: string; label: string } | null;
  onChange: (option: { value: string; label: string } | null) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Selecione uma opção',
}) => {
  return (
    <SelectReact
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      isMulti={false}
      isSearchable={false}
      isClearable={false}
      classNamePrefix="react-select"
    />
  );
};

export default Select;
