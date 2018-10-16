import classNames from 'classnames';
import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface CheckboxProps {
  defaultChecked?: boolean;
  disabled?: boolean;
  name: string;
  onInputChange?: () => void;
  text: string;
  value: string;
  style?: 'default' | 'boxed';
  Additional;
  AdditionalProps;
}

const Checkbox: StatelessComponent<CheckboxProps> = ({
  defaultChecked,
  disabled,
  name,
  onInputChange,
  text,
  value,
  Additional,
  AdditionalProps = {},
  style,
}) => {
  const checkboxClassNames = classNames('checkbox', {
    [`checkbox--${style}`]: style,
  });

  return (
    <label className={checkboxClassNames}>
      <style jsx>{styles}</style>
      <input
        className="checkbox__input"
        type="checkbox"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onInputChange}
      />
      <span className="checkbox__checkmark" />

      {Additional && (
        <span className="checkbox__additional">
          <Additional {...AdditionalProps} />
        </span>
      )}

      <span className="checkbox__text">{text}</span>
    </label>
  );
};

export default Checkbox;
