import React from 'react';
import Icon from '~/blocks/Icon';

import '~/static/images/icons.svg';
import styles from './styles.css';

const Icons = ({ name, width, height }) => (
  <div className="icons">
    <style jsx>{styles}</style>
    <div className="icons__el">
      <span className="icons__name">{name}</span>
      <Icon name={`icons_${name}`} height={height} width={width} />
    </div>
  </div>
);

const Twitter = () => <Icons name="twitter" />;

export { Twitter };
