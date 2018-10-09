import classNames from 'classnames';
import React, { StatelessComponent } from 'react';
import NextLink from '~/link';

import styles from './styles.css';

export interface LinkProps {
  size?: string;
  style?: string;
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
}) => {
  const linkClassNames = classNames('link', {
    [`link--${size}`]: size,
    [`link--${style}`]: style,
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
