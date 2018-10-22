import React, { StatelessComponent } from 'react';
import Slider from '~/blocks/Slider';

import styles from './styles.css';

export interface SelectorProps {
  name;
  description;
  defaultValue;
  value;
  unit;
}

export const Selector: StatelessComponent<SelectorProps> = ({
  name,
  description,
  defaultValue,
  value,
  unit = '%',
}) => {
  return (
    <div className="slider-policy">
      <style jsx>{styles}</style>
      <div className="slider-policy__name">{name}</div>
      <div className="slider-policy__value">
        {value}
        {unit}
      </div>
      <div className="slider-policy__slider">
        <Slider defaultValue={defaultValue} />
      </div>
      <div className="slider-policy__desc">{description}</div>
    </div>
  );
};

export default Selector;
