import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface SliderProps {
  min: number;
  max: number;
  defaultValue?: string;
  onChange?: () => void;
  step?: number;
}

const Slider: StatelessComponent<SliderProps> = ({ min, max, step = 1, defaultValue, onChange }) => (
  <div className="slider">
    <style jsx>{styles}</style>
    <input
      type="range"
      min={min}
      max={max}
      defaultValue={defaultValue}
      className="slider__item"
      onChange={onChange}
      step={step}
    />
  </div>
);

export default Slider;
