import React from 'react';
import spacings from '~/design/spacings.js';

import styles from './styles.css';

const Spacings = () => (
  <div className="spacings">
    <style jsx>{styles}</style>
    {Object.keys(spacings).map((key, index) => (
      <div key={key} className="spacings__row">
        <div className="spacings__col">{key}</div>
        <div className="spacings__col">{spacings[key]}</div>
      </div>
    ))}
  </div>
);

export default Spacings;
