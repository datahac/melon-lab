import React from 'react';
import colorsVariables from '~/design/colors.js';

import styles from './styles.css';

const ColorWrapper = ({ colors }) => (
  <div className="colors">
    <style jsx>{styles}</style>
    {Object.keys(colors).map((key, index) => (
      <div key={key} className="colors__row">
        <div className="colors__col">
          <div className="colors__wrapper">
            <div
              className="colors__color"
              style={{ backgroundColor: colors[key] }}
            />
            <div className="colors__colorName">{key}</div>
            <div className="colors__colorCode">{colors[key]}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const MainColors = () => <ColorWrapper colors={colorsVariables.mainColors} />;
const StatusColors = () => (
  <ColorWrapper colors={colorsVariables.statusColors} />
);
const OtherColors = () => <ColorWrapper colors={colorsVariables.otherColors} />;

export { MainColors, StatusColors, OtherColors };
