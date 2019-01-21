import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface ToggleProps {
  disabled?: boolean;
  isChecked?: boolean;
  name: string;
  onChange?: () => void;
  text: string;
  value: string;
}

const Toggle: StatelessComponent<ToggleProps> = ({
  disabled,
  isChecked,
  name,
  onChange,
  text,
  value,
}) => (
  <label className="toggle">
    <style jsx>{styles}</style>
    <input
      className="toggle__input"
      type="radio"
      name={name}
      value={value}
      checked={isChecked}
      disabled={disabled}
      onChange={onChange}
      hidden
    />
    <span className="toggle__text">{text}</span>
  </label>
);

export default Toggle;
