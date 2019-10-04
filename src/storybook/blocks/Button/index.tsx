import classNames from 'classnames';
import React, { StatelessComponent } from 'react';
import Icons from '~/design/Icons';

import styles from './styles.css';

export interface ButtonProps {
  buttonValue?: any;
  disabled?: boolean;
  onClick?: (e, value) => void;
  size?: 'tiny' | 'small' | 'medium' | 'large';
  style?: 'secondary' | 'primary' | 'warning' | 'danger' | 'success' | 'clear';
  type?: string;
  icon?: string;
}

const Button: StatelessComponent<ButtonProps> = ({
  buttonValue,
  children,
  disabled,
  onClick,
  size = 'medium',
  style = 'primary',
  type = 'button',
  icon,
}) => {
  const buttonClassNames = classNames('button', {
    [`button--${size}`]: size,
    [`button--${style}`]: style,
  });

  const onButtonClick = (e: any): void => {
    if (onClick) {
      e.preventDefault();
      return onClick(e, buttonValue);
    }
  };

  return (
    <button type={type} onClick={onButtonClick} className={buttonClassNames} disabled={disabled}>
      <style jsx>{styles}</style>
      {icon && (
        <span className="button__icon">
          <Icons height="16px" width="16px" name={icon} />
        </span>
      )}

      {children}
    </button>
  );
};

export default Button;
