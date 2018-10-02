import classNames from 'classnames';
import React from 'react';

import styles from './styles.css';

const VolumeBar = ({ widthBar, leftSpaceBorder, widthBorder, style }) => {
  const volumeBarClassNames = classNames('volume-bar__item', {
    [`volume-bar__item--${style}`]: style,
  });

  return (
    <div className="volume-bar">
      <style jsx>{styles}</style>
      <span
        className={volumeBarClassNames}
        style={{
          width: widthBar,
        }}
      />
      <span
        className="volume-bar__border"
        style={{
          left: leftSpaceBorder,
          width: widthBorder,
        }}
      />
    </div>
  );
};

export default VolumeBar;
