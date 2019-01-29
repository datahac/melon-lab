import React, { StatelessComponent, Fragment } from 'react';

import styles from './styles.css';

export interface SwitchProps {
  disabled?: boolean;
  isChecked?: boolean;
  labels: string[];
  name: string;
  onChange: (e) => void;
  options: string[];
  value: string;
}

const Switch: StatelessComponent<SwitchProps> = ({
  disabled,
  isChecked,
  labels,
  name,
  onChange,
  options,
  value,
}) => {
  const handleChange = (e: any): void => {
    const checked = e.target.checked;
    const checkedValue = !checked ? labels[0] : labels[1];
    e.target.value = checkedValue;
    onChange(e);
  };

  return (
    <div className="switch">
      <style jsx={true}>{styles}</style>
      <label className="switch__wrapper">
        <input
          name={name}
          value={value}
          onChange={handleChange}
          className="switch__input"
          type="checkbox"
          defaultChecked={isChecked}
          disabled={disabled}
        />
        {isChecked ? (
          <Fragment>
            <span className="switch__label">
              {labels[1]} {options[0]}
            </span>
            <span className="switch__label">
              {labels[0]} {options[1]}
            </span>
          </Fragment>
        ) : (
          <Fragment>
            <span className="switch__label">
              {labels[0]} {options[0]}
            </span>
            <span className="switch__label">
              {labels[1]} {options[1]}
            </span>
          </Fragment>
        )}

        <div className="switch__icon" />
      </label>
    </div>
  );
};

export default Switch;
