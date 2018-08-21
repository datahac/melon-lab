import React, { StatelessComponent } from 'react';
import Icon from '~/blocks/Icon';

import styles from './styles.css';

export interface SpinnerProps {
  size?: string;
  icon?: boolean;
}

const Spinner: StatelessComponent<SpinnerProps> = ({
  size = 'default',
  icon,
}) => {
  const sizeClass = `spinner--${size}`;
  const classes = `spinner ${sizeClass}`;

  return (
    <div className={classes}>
      <style jsx>{styles}</style>
      {icon &&
        <Icon iconClass="spinner__icon" name="logos_without-border" />
      }
      <div className="spinner__loader" />
    </div>
  );
};

export default Spinner;
