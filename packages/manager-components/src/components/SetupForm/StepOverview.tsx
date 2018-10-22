import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface StepTermsProps {}

export const StepTerms: StatelessComponent<StepTermsProps> = ({}) => {
  return (
    <div className="setup__step">
      <style jsx>{styles}</style>
      <h3>Overview</h3>
    </div>
  );
};

export default StepTerms;
