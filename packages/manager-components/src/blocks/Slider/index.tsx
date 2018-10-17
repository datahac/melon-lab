import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface SliderProps {
  min: number;
  max: number;
  value?: number;
}

const Slider: StatelessComponent<SliderProps> = ({ min, max, value }) => {
  return (
    <div className="slider">
      <style jsx>{styles}</style>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        className="slider__item"
      />
    </div>
  );
};

export default Slider;
