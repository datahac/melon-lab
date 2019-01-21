import React, { StatelessComponent } from 'react';
import Policies from '~/components/Policies';
import availablePolicies from '~/shared/utils/availablePolicies';

import styles from './styles.css';
import { ObjectCache } from 'apollo-cache-inmemory';

interface FormValues {
  policies: ObjectCache;
}
export interface StepRiskProfileProps {
  errors?: any;
  handleBlur?: () => void;
  handleChange?: () => void;
  touched?: any;
  values: FormValues;
  onActivatePolicy;
}

export const StepRiskProfile: StatelessComponent<StepRiskProfileProps> = ({
  onActivatePolicy,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) => {
  return (
    <div className="setup__step">
      <style jsx>{styles}</style>
      <h3>Risk Profile</h3>
      <p>
        Configure the risk management profile of your fund and the rules to be
        enforce by the smart contracts
      </p>

      <Policies
        handleChange={handleChange}
        handleBlur={handleBlur}
        values={values}
        errors={errors}
        touched={touched}
        onActivatePolicy={onActivatePolicy}
        availablePolicies={availablePolicies}
      />
    </div>
  );
};

export default StepRiskProfile;
