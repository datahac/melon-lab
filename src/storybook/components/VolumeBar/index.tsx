import classNames from 'classnames';
import React from 'react';

import styles from './styles.css';

const VolumeBar = ({ widthBar, style }) => {
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
    </div>
  );
};

export default VolumeBar;
