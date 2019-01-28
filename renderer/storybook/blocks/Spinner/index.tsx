import classNames from 'classnames';
import React, { StatelessComponent } from 'react';
import Logos from '~/design/Logos';

import styles from './styles.css';

export interface SpinnerProps {
  icon?: boolean;
  size?: string;
  text?: string;
}

const Spinner: StatelessComponent<SpinnerProps> = ({
  icon,
  size = 'default',
  text,
}) => {
  const spinnerClassNames = classNames('spinner', {
    [`spinner--${size}`]: size,
  });

  return (
    <div className={spinnerClassNames}>
      <style jsx>{styles}</style>
      <div className="spinner__wrapper">
        {icon && <Logos logoClass="spinner__icon" name="without-border" />}
        <div className="spinner__loader" />
      </div>
      {text && <div className="spinner__text">{text}</div>}
    </div>
  );
};

export default Spinner;
