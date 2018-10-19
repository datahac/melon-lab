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
  roundedCorners?: boolean;
  error;
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
  roundedCorners,
  error,
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
          onChange={onInputChange}
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
