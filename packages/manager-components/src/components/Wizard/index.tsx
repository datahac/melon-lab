import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import StepNavigation from '~/components/StepNavigation';

import styles from './styles.css';

export interface WizardProps {
  page: number;
  setPage: (page) => void;
  onSubmit: () => void;
  steps;
}

export const Wizard: StatelessComponent<WizardProps> = ({
  children,
  page,
  setPage,
  onSubmit,
  steps,
}) => {
  const next = () => {
    setPage(page + 1);
  };

  const prev = () => {
    setPage(page - 1);
  };

  const activePage = React.Children.toArray(children)[0];
  const isLastPage = page === React.Children.count(children) - 1;
  const isFirstPage = page === 0;

  const handleSubmit = () => {
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit();
    } else {
      next();
    }
  };

  return (
    <div className="wizard">
      <style jsx>{styles}</style>

      <StepNavigation steps={steps} activeStep={page} />

      {activePage}

      <div className="wizard__actions">
        {!isFirstPage && (
          <div className="wizard__action">
            <Button onClick={prev} type="button">
              Back
            </Button>
          </div>
        )}

        <div className="wizard__action">
          <Button onClick={handleSubmit} type="button">
            {isLastPage ? 'Confirm' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
