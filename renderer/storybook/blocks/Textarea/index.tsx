import React, { StatelessComponent, Fragment } from 'react';

import styles from './styles.css';

export interface TextareaProps {
  rows?: number;
  cols?: number;
  name?: string;
  value?: string;
  onBlur?: () => void;
  onChange?: () => void;
}

const Textarea: StatelessComponent<TextareaProps> = ({
  rows,
  cols,
  name,
  value,
  onBlur,
  onChange,
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
    />
  </Fragment>
);

export default Textarea;
