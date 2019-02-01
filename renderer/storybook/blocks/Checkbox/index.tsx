import classNames from 'classnames';
import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface CheckboxProps {
  defaultChecked?: boolean;
  disabled?: boolean;
  name: string;
  handleOnChange?: (e) => void;
  handleOnBlur?: (e) => void;
  text: string;
  value?: string;
  style?: 'default' | 'boxed';
  Additional?: any;
  AdditionalProps?: any;
  roundedCorners?: boolean;
  error?: string;
  required?: boolean;
}

const Checkbox: StatelessComponent<CheckboxProps> = ({
  defaultChecked,
  disabled,
  name,
  handleOnChange,
  text,
  value,
  Additional,
  AdditionalProps = {},
  style,
  roundedCorners,
  error,
  required,
  handleOnBlur,
}) => {
  const checkboxClassNames = classNames('checkbox__label', {
    [`checkbox__label--${style}`]: style,
    'checkbox__label--rounded-corners': roundedCorners,
  });

  return (
    <div className="checkbox">
      <style jsx>{styles}</style>
      {error && <div className="checkbox__error">{error}</div>}
      <label className={checkboxClassNames}>
        <input
          className="checkbox__input"
          type="checkbox"
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={handleOnChange}
          required={required}
          onBlur={handleOnBlur}
        />
        <span className="checkbox__checkmark" />

        {Additional && (
          <span className="checkbox__additional">
            <Additional {...AdditionalProps} />
          </span>
        )}

        <span className="checkbox__text">{text}</span>

        {style === 'boxed' && <div className="checkbox__border" />}
      </label>
    </div>
  );
};

export default Checkbox;
