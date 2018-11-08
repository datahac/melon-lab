import React from 'react';
import typography from '~/design/typography.js';

import styles from './styles.css';

const FontSizes = () => (
  <div className="fonts">
    <style jsx>{styles}</style>
    {Object.keys(typography.fontSizes).map(key => (
      <div key={key} className="fonts__row">
        <div
          className="fonts__col"
          style={{ fontSize: typography.fontSizes[key] }}
        >
          {key}
        </div>
        <div
          className="fonts__col"
          style={{ fontSize: typography.fontSizes[key] }}
        >
          {typography.fontSizes[key]}
        </div>
      </div>
    ))}
  </div>
);

const FontFamilies = () => (
  <div className="fonts">
    <style jsx>{styles}</style>
    {Object.keys(typography.fontFamilies).map(key => (
      <div key={key} className="fonts__row">
        <div
          className="fonts__col"
          style={{ fontFamily: typography.fontFamilies[key] }}
        >
          {key}
        </div>
        <div
          className="fonts__col"
          style={{ fontFamily: typography.fontFamilies[key] }}
        >
          {typography.fontFamilies[key]}
        </div>
      </div>
    ))}
  </div>
);

const FontWeights = () => (
  <div className="fonts">
    <style jsx>{styles}</style>
    {Object.keys(typography.fontWeights).map(key => (
      <div key={key} className="fonts__row">
        <div
          className="fonts__col"
          style={{ fontWeight: typography.fontWeights[key] }}
        >
          {key}
        </div>
        <div
          className="fonts__col"
          style={{ fontWeight: typography.fontWeights[key] }}
        >
          {typography.fontWeights[key]}
        </div>
      </div>
    ))}
  </div>
);

export { FontWeights, FontFamilies, FontSizes };
