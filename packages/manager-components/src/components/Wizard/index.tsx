import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import StepNavigation from '~/components/StepNavigation';

import styles from './styles.css';

export interface WizardProps {
  page: number;
  setPage: (page) => void;
  onCancel;
  steps;
  FirstAction;
  FirstActionProps;
  LastAction;
  LastActionProps;
  onClickNext;
}

export const Wizard: StatelessComponent<WizardProps> = ({
  children,
  page,
  setPage,
  steps,
  FirstAction = Button,
  FirstActionProps = {},
  LastAction = Button,
  LastActionProps = {},
  onClickNext,
}) => {
  const activePage = React.Children.toArray(children)[page];
  const isLastPage = page === React.Children.count(children) - 1;
  const isFirstPage = page === 0;

  const goToPrevPage = () => setPage(page - 1);
  const goToNextPage = async e => {
    e.preventDefault();
    const isInvalid = onClickNext && (await onClickNext());
    if (isInvalid) {
      return setPage(page);
    }
    return setPage(page + 1);
  };

  return (
    <div className="wizard">
      <style jsx>{styles}</style>

      <div className="wizard__step-navigation">
        <StepNavigation onClickStep={setPage} steps={steps} activeStep={page} />
      </div>

      {activePage}

      <div className="wizard__actions">
        <div className="wizard__action">
          {isFirstPage ? (
            <FirstAction {...FirstActionProps} />
          ) : (
            <Button style="secondary" onClick={goToPrevPage} type="button">
              Back
            </Button>
          )}
        </div>

        <div className="wizard__action">
          {isLastPage ? (
            <LastAction {...LastActionProps} />
          ) : (
            <Button onClick={goToNextPage} type="submit">
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wizard;
