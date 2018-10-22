import React, { StatelessComponent } from 'react';
import Icon from '~/blocks/Icon';

import styles from './styles.css';

export interface PoliciesProps {
  activatedPolicies?;
  policies;
  activatePolicy;
}

export const Policies: StatelessComponent<PoliciesProps> = ({
  activatedPolicies,
  policies,
  activatePolicy,
}) => {
  return (
    <div className="policies">
      <style jsx>{styles}</style>
      <h4>Active policies</h4>
      <div className="policies__items">
        {activatedPolicies.map(item => (
          <div className="policies__item" key={item.name}>
            <div className="policies__item-wrap policies__item-wrap--active">
              {item.name}
              <item.Component {...item.ComponentProps} />
            </div>
          </div>
        ))}
      </div>

      <h4>Inactive policies</h4>
      <div className="policies__items">
        {policies.map(item => (
          <div className="policies__item" key={item.name}>
            <div className="policies__item-wrap">
              {item.name}
              <span className="policies__item-add" onClick={activatePolicy}>
                <Icon name="icons_plus" height="16px" width="14px" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policies;
