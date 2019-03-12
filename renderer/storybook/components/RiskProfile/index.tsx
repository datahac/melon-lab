import React, { StatelessComponent } from 'react';
import Policies from '~/components/Policies';
import Form from '~/blocks/Form';
import Button from '~/blocks/Button';
import * as R from 'ramda';
import styles from './styles.css';

interface FormValues {
  policies: any;
}

export interface RiskProfileProps {
  errors?: any;
  handleBlur?: () => void;
  handleChange?: () => void;
  handleSubmit?: () => void;
  touched?: any;
  values: FormValues;
  onActivatePolicy;
  availablePolicies;
}

export const RiskProfile: StatelessComponent<RiskProfileProps> = ({
  onActivatePolicy,
  values,
  errors,
  touched,
  destination,
  address,
  router,
  handleSubmit,
  handleBlur,
  handleChange,
  availablePolicies,
  existingPolicies,
}) => {
  // TODO: Filter available policies and show already registered policies.
  // console.log(existingPolicies);
  const canSubmit = !!Object.keys(R.propOr({}, 'policies', values)).length && !Object.keys(errors).length;

  return (
    <Form onSubmit={handleSubmit}>
      <style jsx>{styles}</style>
      <h3>Risk Profile</h3>
      <p>
        Configure the risk management profile of your fund and the rules to be
        enforced by the smart contracts.
      </p>

      <Policies
        handleChange={handleChange}
        handleBlur={handleBlur}
        values={values}
        errors={errors}
        touched={touched}
        onActivatePolicy={onActivatePolicy}
        availablePolicies={availablePolicies}
      />

      <div className="risk-profile__actions">
        <div className="risk-profile__action">
          <Button type="submit" disabled={!canSubmit}>Submit request</Button>
        </div>

        <div className="risk-profile__action">
          <Button
            style="danger"
            onClick={() => {
              const target = destination
                ? destination
                : {
                  pathname: '/manage',
                  query: {
                    address,
                  },
                };

              router.push(target);
            }}
          >
            Skip
          </Button>
        </div>
      </div>

    </Form>
  );
};

export default RiskProfile;
