import React, { StatelessComponent } from 'react';
import Checkbox from '~/blocks/Checkbox';

import styles from './styles.css';

export interface GetStartedProps {
  availableItems?: Array<{
    value: string;
    text: string;
  }>;
  selectedItems?: Array<string>;
  onChange: () => void;
}

export const GetStarted: StatelessComponent<GetStartedProps> = ({
  availableItems = [],
  selectedItems = [],
  onChange,
}) => {
  return (
    <div className="exchange-selector">
      {selectedItems.length} Exchange(s) selected
      <div className="exchange-selector__exchanges">
        {availableItems &&
          availableItems.map(exchange => (
            <div key={exchange.value} className="exchange-selector__exchange">
              <Checkbox
                style="boxed"
                name="blabla"
                text={exchange.text}
                value={exchange.value}
                onInputChange={onChange}
                defaultChecked={selectedItems.indexOf(exchange.value) !== -1}
              />
            </div>
          ))}
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};

export default GetStarted;
