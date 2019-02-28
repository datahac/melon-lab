import React, { StatelessComponent } from 'react';
import Policies from '~/components/Policies';
import Form from '~/blocks/Form';
import Button from '~/blocks/Button';

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
  handleSubmit,
  handleBlur,
  handleChange,
  availablePolicies,
  existingPolicies,
}) => {
  // TODO: Filter available policies and show already registered policies.
  console.log(existingPolicies);

  return (
    <Form onSubmit={handleSubmit}>
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

      <div className="risk-profile-form__input">
        <Button type="submit">Submit request</Button>
      </div>
    </Form>
  );
};

export default RiskProfile;
