import classNames from 'classnames';
import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface ButtonProps {
  onClick: () => void;
}

const Button: StatelessComponent<ButtonProps> = ({ children, onClick }) => {
  const buttonClassNames = classNames('tile', {});

  return (
    <div onClick={onClick} className={buttonClassNames}>
      <style jsx>{styles}</style>
      {children}
    </div>
  );
};

export default Button;
