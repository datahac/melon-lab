import React, { StatelessComponent, Fragment } from 'react';
import Icon from '~/blocks/Icon';

import styles from './styles.css';

export interface PoliciesProps {
  activatedPolicies?;
  availablePolicies;
  activatePolicy;
}

export const Policies: StatelessComponent<PoliciesProps> = ({
  activatedPolicies,
  availablePolicies,
  activatePolicy,
}) => {
  return (
    <div className="policies">
      <style jsx>{styles}</style>

      <h4>Active policies</h4>
      {activatedPolicies.length > 0 ? (
        <div className="policies__items">
          {activatedPolicies.map(item => (
            <div className="policies__item" key={item.name}>
              <div className="policies__item-wrap policies__item-wrap--active">
                {item.name}
                {/* <item.Component {...item.limitations} /> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No active policies</p>
      )}

      <h4>Available policies</h4>
      {availablePolicies.length > 0 ? (
        <div className="policies__items">
          {availablePolicies &&
            availablePolicies.map(item => (
              <div className="policies__item" key={item.name}>
                <div
                  className="policies__item-wrap policies__item-wrap--inactive"
                  onClick={() => activatePolicy(item)}
                >
                  {item.name}
                  <span className="policies__item-add">
                    <Icon name="icons_plus" height="16px" width="14px" />
                  </span>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p>No policies available</p>
      )}
    </div>
  );
};

export default Policies;
