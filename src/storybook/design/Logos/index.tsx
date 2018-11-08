import React from 'react';
import Icon from '~/blocks/Icon';

import '~/static/images/logos.svg';
import styles from './styles.css';

const Logos = ({ name, width, height }) => (
  <div className="logos">
    <style jsx>{styles}</style>
    <div className="logos__el">
      <span className="logos__name">{name}</span>
      <Icon name={`logos_${name}`} height={height} width={width} />
    </div>
  </div>
);

const LogoDefault = () => <Logos name="default" />;
const LogoWithText = () => <Logos name="with-text" />;
const LogoWithBottomText = () => <Logos name="with-bottom-text" />;

export { LogoDefault, LogoWithBottomText, LogoWithText };
