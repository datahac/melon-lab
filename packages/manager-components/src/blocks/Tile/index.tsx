import classNames from 'classnames';
import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface ButtonProps {
  onClick: () => void;
  active?: boolean;
  error?: boolean;
}

const Button: StatelessComponent<ButtonProps> = ({
  children,
  onClick,
  active,
  error,
}) => {
  const buttonClassNames = classNames('tile', {
    'tile--active': active,
    'tile--error': error,
  });

  return (
    <div onClick={onClick} className={buttonClassNames}>
      <style jsx>{styles}</style>
      {children}
    </div>
  );
};

export default Button;
