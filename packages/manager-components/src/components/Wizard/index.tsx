import React, { StatelessComponent } from 'react';
import StepNavigation from '~/components/StepNavigation';
import Spinner from '~/blocks/Spinner';

import styles from './styles.css';

export interface WizardProps {
  page: number;
  setPage: (page) => void;
  steps;
  loading: boolean;
}

export const Wizard: StatelessComponent<WizardProps> = ({
  children,
  loading,
  page,
  setPage,
  steps,
}) => {
  const activePage = loading ? (
    <Spinner
      icon
      size="small"
      text="Waiting for transaction ..."
    />
  ) : React.Children.toArray(children)[page];
  console.log(loading);
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
