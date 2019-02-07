import classNames from 'classnames';
import React, { StatelessComponent } from 'react';
import NumberFormat from 'react-number-format';

import styles from './styles.css';

export interface InputProps {
  decimals?: number;
  disabled?: boolean;
  error?: string;
  formatNumber?: boolean;
  hidden?: boolean;
  insideLabel?: boolean;
  label?: string;
  name: string;
  onBlur?: () => void;
  onChange?: (e) => void;
  pattern?: string;
  placeholder?: string;
  step?: string;
  type?: string;
  value?: string;
  maxlength?: number;
  min?: number;
  max?: number;
  centerText?: boolean;
  required?: boolean;
}

const Input: StatelessComponent<InputProps> = ({
  decimals = 0,
  disabled,
  error,
  formatNumber,
  hidden,
  insideLabel,
  label,
  name,
  onBlur,
  onChange,
  pattern,
  placeholder,
  step,
  type = 'text',
  value,
  maxlength,
  min,
  max,
  centerText,
  required,
}) => {
  const inputClassNames = classNames('input', {
    'input--inside-label': insideLabel,
    'input--has-error': error,
    'input--center-text': centerText,
  });

  return (
    <div className={inputClassNames}>
      <style jsx>{styles}</style>
      {label && <span className="input__label">{label}</span>}
      {formatNumber ? (
        <NumberFormat
          hidden={hidden}
          name={name}
          pattern={pattern}
          step={step}
          className="input__field"
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          decimalScale={decimals}
          fixedDecimalScale={true}
          isNumericString={true}
          type="text"
          min={min}
          max={max}
          required={required}
        />
      ) : (
        <input
          maxLength={maxlength}
          hidden={hidden}
          name={name}
          pattern={pattern}
          step={step}
          className="input__field"
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          min={min}
          max={max}
          required={required}
        />
      )}
      {error && <div className="input__error">{error}</div>}
    </div>
  );
};

export default Input;
