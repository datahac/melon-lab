import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';

import styles from './styles.css';

export interface WizardPageProps {
  FirstAction;
  FirstActionProps;
  LastAction;
  LastActionProps;
}

export const WizardPage: StatelessComponent<WizardPageProps> = ({
  children,
  onClickPrev,
  onClickNext,
  FirstAction = Button,
  FirstActionProps = {
    children: 'Back',
    style: 'secondary',
    onClick: onClickPrev,
  },
  LastAction = Button,
  LastActionProps = {
    children: 'Next',
    onClick: onClickNext,
  },
}) => (
  <div className="wizard-page">
    <style jsx>{styles}</style>
    {children}

    <div className="wizard-page__actions">
      <div className="wizard-page__action">
        <FirstAction {...FirstActionProps} />
      </div>

      <div className="wizard-page__action">
        <LastAction {...LastActionProps} />
      </div>
    </div>
  </div>
);

export default WizardPage;
