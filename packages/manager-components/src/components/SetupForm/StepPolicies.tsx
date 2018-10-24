import React, { StatelessComponent } from 'react';
import Policies from '~/components/Policies';

import styles from './styles.css';

export interface StepPoliciesProps {
  availablePolicies;
  activatePolicy;
  activatedPolicies;
}

export const StepPolicies: StatelessComponent<StepPoliciesProps> = ({
  availablePolicies,
  activatePolicy,
  activatedPolicies,
}) => {
  return (
    <div className="setup__step">
      <style jsx>{styles}</style>
      <h3>Risk Profile</h3>
      <p>
        For this version, the modules that your fund will use are predefined ie.
        you do not need to choose a module. For your record, below are the
        predefined modules for this version.
      </p>

      <Policies
        availablePolicies={availablePolicies}
        activatePolicy={activatePolicy}
        activatedPolicies={activatedPolicies}
      />
    </div>
  );
};

export default StepPolicies;
