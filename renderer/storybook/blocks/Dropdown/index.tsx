import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface DropdownProps {
  disabled?: boolean;
  label?: string;
  name: string;
  onChange: (e) => void;
  options: Array<{
    value: string;
    name: string;
  }>;
  value?: string;
}

const Dropdown: StatelessComponent<DropdownProps> = ({
  disabled,
  label,
  name,
  onChange,
  options,
  value,
}) => {
  return (
    <div className="dropdown">
      <style jsx>{styles}</style>
      {label && <span className="dropdown__label">{label}</span>}
      <div className="dropdown__wrapper">
        <select
          name={name}
          className="dropdown__select"
          onChange={onChange}
          value={value}
          disabled={disabled}
        >
          {options &&
            options.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
