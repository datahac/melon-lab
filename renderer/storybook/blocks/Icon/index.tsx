import classNames from 'classnames';
import React, { StatelessComponent } from 'react';

export interface IconProps {
  height?: string;
  iconClass?: string;
  name: string;
  width?: string;
}

const Icon: StatelessComponent<IconProps> = ({
  height,
  iconClass,
  name,
  width,
}) => {
  const iconClassNames = classNames('icon', {
    [`${iconClass}`]: iconClass,
  });

  return (
    <svg
      className={iconClassNames}
      height={height ? height : '100%'}
      width={width ? width : '100%'}
    >
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

export default Icon;
