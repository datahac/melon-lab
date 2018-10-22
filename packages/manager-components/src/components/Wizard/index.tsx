import React, { StatelessComponent } from 'react';
import StepNavigation from '~/components/StepNavigation';

import styles from './styles.css';

export interface WizardProps {
  page: number;
  setPage: (page) => void;
  steps;
}

export const Wizard: StatelessComponent<WizardProps> = ({
  children,
  page,
  setPage,
  steps,
}) => {
  const activePage = React.Children.toArray(children)[page];

  return (
    <div className="wizard">
      <style jsx>{styles}</style>

      <div className="wizard__step-navigation">
        <StepNavigation onClickStep={setPage} steps={steps} activeStep={page} />
      </div>

      {activePage}
    </div>
  );
};

export default Wizard;
