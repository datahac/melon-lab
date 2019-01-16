import React, { StatelessComponent, Fragment } from 'react';
import Icon from '~/blocks/Icon';
import Button from '~/blocks/Button';
import * as R from 'ramda';

import styles from './styles.css';

export interface PoliciesProps {
  onActivatePolicy;
  values: any;
  handleBlur?: () => void;
  handleChange?: () => void;
  touched?: any;
  errors?: any;
  availablePolicies?: any;
}

export const Policies: StatelessComponent<PoliciesProps> = ({
  onActivatePolicy,
  availablePolicies,
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}) => {
  const activePolicies = R.intersection(
    Object.keys(availablePolicies),
    Object.keys(values.policies),
  );

  const inactivePolicies = R.difference(
    Object.keys(availablePolicies),
    Object.keys(values.policies),
  );

  return (
    <div className="policies">
      <style jsx>{styles}</style>
      <h4>Active policies</h4>
      {activePolicies.length > 0 ? (
        <div className="policies__items">
          {activePolicies.map(item => {
            const policy = availablePolicies[item];
            return (
              <div className="policies__item" key={item}>
                <div className="policies__item-wrap policies__item-wrap--active">
                  <div className="policies__item-name">{policy.name}</div>
                  <policy.Component
                    {...policy.limitations}
                    value={values.policies[item] && values.policies[item]}
                    name={`policies.${item}`}
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      !!touched.policies &&
                      !!touched.policies[item] &&
                      !!errors.policies &&
                      errors.policies[item]
                    }
                    centerText
                  />
                  <div className="policies__item-desc">{policy.desc}</div>
                  <div className="policies__item-remove">
                    <Button
                      style="danger"
                      onClick={() => onActivatePolicy(item)}
                      size="small"
                    >
                      Deactivate
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Fragment>No active policies</Fragment>
      )}

      <hr />
      <h4>Inactive policies</h4>
      {inactivePolicies.length > 0 ? (
        <div className="policies__items">
          {inactivePolicies.length > 0 &&
            inactivePolicies.map(item => (
              <div className="policies__item" key={item}>
                <div
                  className="policies__item-wrap policies__item-wrap--inactive"
                  onClick={() => onActivatePolicy(item)}
                >
                  {availablePolicies[item].name}
                  <span className="policies__item-add">
                    <Icon name="icons_plus" height="16px" width="14px" />
                  </span>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <Fragment>No Inactive policies</Fragment>
      )}
    </div>
  );
};

export default Policies;
