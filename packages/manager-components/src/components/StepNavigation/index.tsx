import classNames from 'classnames';
import React, { StatelessComponent } from 'react';

import styles from './styles.css';

export interface StepNavigationProps {
  steps: Array<{
    key: string;
    name: string;
  }>;
  activeStep: number;
}

export const StepNavigation: StatelessComponent<StepNavigationProps> = ({
  steps,
  activeStep,
}) => {
  const activeStepClassName = (step, i) =>
    classNames('step-navigation__step', {
      'step-navigation__step--active': i === activeStep,
      'step-navigation__step--completed': step.isCompleted,
    });

  return (
    <ul className="step-navigation" data-c-name="StepNavigation">
      <style jsx>{styles}</style>
      {steps &&
        steps.map((step, i) => (
          <li key={step.key} className={activeStepClassName(step, i)}>
            <span className="step-navigation__wrap">
              <span className="step-navigation__counter" />
              <span className="step-navigation__text">{step.name}</span>
            </span>
          </li>
        ))}
    </ul>
  );
};

export default StepNavigation;
