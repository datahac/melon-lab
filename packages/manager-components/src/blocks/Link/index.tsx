import classNames from 'classnames';
import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface LinkProps {
  size?: string;
  style?: string;
  href?: string;
  target?: string;
  onClick?: () => void;
}

const Link: StatelessComponent<LinkProps> = ({
  children,
  size,
  style,
  href,
  target = '_self',
  onClick,
}) => {
  const linkClassNames = classNames('link', {
    [`link--${size}`]: size,
    [`link--${style}`]: style,
  });

  return (
    <a onClick={onClick} href={href} target={target} className={linkClassNames}>
      <style jsx>{styles}</style>
      {children}
    </a>
  );
};

export default Link;
