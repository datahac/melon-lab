import React, { StatelessComponent } from 'react';
import Select from 'react-select';

import styles from './styles.css';

export interface MultiDropdownProps {
  onChange: (values) => void;
  options: Array<{
    value: string;
    label: string;
  }>;
  value?: string;
  name?: string;
}

const MultiDropdown: StatelessComponent<MultiDropdownProps> = ({
  onChange,
  options,
  value,
  name,
}) => {
  const customStyles = {
    container: provided => ({
      ...provided,
      width: '100%',
    }),
  };

  const handleOnChange = value => {
    onChange({ target: { value, name }, type: 'change' });
  };

  return (
    <div className="dropdown">
      <style jsx>{styles}</style>
      <Select
        styles={customStyles}
        options={options}
        onChange={handleOnChange}
        value={value}
        isMulti
        name={name}
      />
    </div>
  );
};

export default MultiDropdown;
