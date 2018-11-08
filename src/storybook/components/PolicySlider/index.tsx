import React, { StatelessComponent } from 'react';
import Slider from '~/blocks/Slider';

import styles from './styles.css';

export interface PolicySliderProps {
  name;
  description;
  defaultValue;
  value;
  unit;
}

export const PolicySlider: StatelessComponent<PolicySliderProps> = ({
  name,
  description,
  defaultValue,
  value,
  unit = '%',
}) => {
  return (
    <div className="policy-slider">
      <style jsx>{styles}</style>
      <div className="policy-slider__name">{name}</div>
      <div className="policy-slider__value">
        {value}
        {unit}
      </div>
      <div className="policy-slider__slider">
        <Slider defaultValue={defaultValue} />
      </div>
      <div className="policy-slider__desc">{description}</div>
    </div>
  );
};

export default PolicySlider;
