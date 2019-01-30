import React, { StatelessComponent } from 'react';
import Checkbox from '~/blocks/Checkbox';

import styles from './styles.css';

export interface SelectorProps {
  availableItems?: Array<{
    value: string;
    text: string;
  }>;
  selectedItems?: Array<string>;
  handleOnChange: () => void;
  handleOnBlur?: () => void;
  errors;
}

export const Selector: StatelessComponent<SelectorProps> = ({
  availableItems = [],
  selectedItems = [],
  handleOnChange,
  errors,
  handleOnBlur,
}) => {
  return (
    <div className="selector">
      {selectedItems.length} Item(s) selected
      {errors && <div className="selector__error">{errors}</div>}
      <div className="selector__items">
        {availableItems &&
          availableItems.map(item => (
            <div key={item.value} className="selector__item">
              <Checkbox
                roundedCorners
                style="boxed"
                name="blabla"
                text={item.text}
                value={item.value}
                handleOnChange={handleOnChange}
                handleOnBlur={handleOnBlur}
                defaultChecked={selectedItems.indexOf(item.value) !== -1}
              />
            </div>
          ))}
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};

export default Selector;
