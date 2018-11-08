import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface DropdownProps {
  disabled?: boolean;
  label?: string;
  name: string;
  onChange: (value, event) => void;
  options: Array<{
    value: string;
    name: string;
  }>;
  value?: string;
}

const renderOption = (option, index) => {
  return (
    <option key={index} value={option.value}>
      {option.name}
    </option>
  );
};

const Dropdown: StatelessComponent<DropdownProps> = ({
  disabled,
  label,
  name,
  onChange,
  options,
  value,
}) => {
  const ops =
    options && options.map((item, index) => renderOption(item, index));

  const handleChange = (e: any): void => {
    const targetValue: any = e.target.value;
    onChange({ value: targetValue }, e);
  };

  return (
    <div className="dropdown">
      <style jsx>{styles}</style>
      {label && <span className="dropdown__label">{label}</span>}
      <div className="dropdown__wrapper">
        <select
          name={name}
          className="dropdown__select"
          onChange={handleChange}
          value={value}
          disabled={disabled}
        >
          {ops}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
