import React, { StatelessComponent, Fragment } from 'react';

import styles from './styles.css';

export interface TextareaProps {
  rows?: number;
  cols?: number;
  name?: string;
  value?: string;
  placeholder?: string;
  onBlur?: () => void;
  onChange?: () => void;
  error?: string;
}

const Textarea: StatelessComponent<TextareaProps> = ({
  rows,
  cols,
  name,
  value,
  onBlur,
  onChange,
  placeholder,
  error,
}) => (
  <Fragment>
    <style jsx>{styles}</style>
    <textarea
      className="textarea"
      name={name}
      rows={rows}
      cols={cols}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
    {error && <div className="textarea__error">{error}</div>}
  </Fragment>
);

export default Textarea;
