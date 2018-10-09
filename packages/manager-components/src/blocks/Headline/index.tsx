import React, { StatelessComponent, Fragment } from 'react';
import Icon from '~/blocks/Icon';

import styles from './styles.css';

export interface HeadlineProps {
  title?: string;
  icon?: string;
  text?: string;
}

const Headline: StatelessComponent<HeadlineProps> = ({ title, icon, text }) => (
  <div className="headline">
    <style jsx>{styles}</style>
    {icon && (
      <div className="headline__icon-wrapper">
        <div className="headline__icon">
          <Icon width="30px" height="30px" name={icon} />
        </div>
      </div>
    )}
    <div className="headline__headline">
      {title && <h1 className="headline__title">{title}</h1>}
      {text && <div className="headline__text">{text}</div>}
    </div>
  </div>
);

export default Headline;
