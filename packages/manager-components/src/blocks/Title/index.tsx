import classNames from 'classnames';
import React, { StatelessComponent, Fragment } from 'react';
import Icon from '~/blocks/Icon';

import styles from './styles.css';

export interface SpinnerProps {
  title?: string;
  icon?: string;
  text?: string;
}

const Title: StatelessComponent<SpinnerProps> = ({ title, icon, text }) => {
  // const spinnerClassNames = classNames('spinner', {
  //   [`spinner--${size}`]: size,
  // });

  return (
    <div className="title">
      <style jsx>{styles}</style>
      {icon && (
        <div className="title__icon">
          <Icon width="50px" height="50px" name={icon} />
        </div>
      )}
      <div className="title__headline">
        {title && <h1 className="title__title">{title}</h1>}
        {text && <div className="title__text">{text}</div>}
      </div>
    </div>
  );
};

export default Title;
