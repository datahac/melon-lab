import React, { StatelessComponent } from 'react';
import Select from 'react-select';
import colors from '~/design/colors';

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
    control: (provided, state) => ({
      ...provided,
      width: '100%',
      borderRadius: 0,
      borderColor: colors.mainColors['--color-border'],
      boxShadow: 'none',
      '&:hover': {
        borderColor: colors.mainColors['--color-border'],
      },
    }),
    menu: provided => ({
      ...provided,
      borderRadius: 0,
      borderColor: colors.mainColors['--color-border'],
      padding: 0,
      margin: 0,
    }),
    menuList: provided => ({
      ...provided,
      padding: 0,
      margin: 0,
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? 'blue'
          : isFocused
          ? colors.mainColors['--color-secondary']
          : null,
        cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
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
