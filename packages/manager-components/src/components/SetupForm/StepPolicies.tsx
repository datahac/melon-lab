import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export const StepPolicies: StatelessComponent = ({}) => {
  return (
    <div className="setup__step">
    <style jsx>{styles}</style>
      <h3>Risk Profile:</h3>
      <p>
        For this version, the modules that your fund will use are predefined ie.
        you do not need to choose a module. For your record, below are the
        predefined modules for this version.
      </p>
    </div>
  );
};

export default StepPolicies;
