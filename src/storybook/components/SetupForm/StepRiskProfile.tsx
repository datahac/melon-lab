import React, { StatelessComponent } from 'react';
import Policies from '~/components/Policies';

import styles from './styles.css';

export interface StepRiskProfileProps {
  availablePolicies;
  activatePolicy;
  activatedPolicies;
}

export const StepRiskProfile: StatelessComponent<StepRiskProfileProps> = ({
  availablePolicies,
  activatePolicy,
  activatedPolicies,
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
        availablePolicies={availablePolicies}
        activatePolicy={activatePolicy}
        activatedPolicies={activatedPolicies}
      />
    </div>
  );
};

export default StepRiskProfile;
