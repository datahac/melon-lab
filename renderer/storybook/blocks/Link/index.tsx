import classNames from 'classnames';
import React, { StatelessComponent } from 'react';
import NextLink from '~/link';

import styles from './styles.css';

export interface LinkProps {
  size?: 'small' | 'medium' | 'large';
  style?: 'primary' | 'secondary' | 'clear';
  type?: 'warning' | 'danger' | 'success';
  href?: string;
  target?: string;
  onClick?: () => void;
  title?: string;
}

const Link: StatelessComponent<LinkProps> = ({
  children,
  size,
  style,
  href,
  target = '_self',
  onClick,
  title,
  type,
}) => {
  const linkClassNames = classNames('link', {
    [`link--${size}`]: size,
    [`link--${style}`]: style,
    [`link--${type}`]: type,
  });

  return (
    <NextLink href={href} passHref>
      <a
        title={title}
        onClick={onClick}
        href={href}
        target={target}
        className={linkClassNames}
      >
        <style jsx>{styles}</style>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
