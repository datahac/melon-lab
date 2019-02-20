import React, { StatelessComponent } from 'react';
import MultiDropdown from '~/blocks/MultiDropdown';

import styles from './styles.css';

interface FormValues {
  authInvestAssets: string;
}

export interface StepAuthInvestAssetsProps {
  errors?: any;
  handleBlur?: () => void;
  handleChange?: () => void;
  handleSubmit?: () => void;
  touched?: any;
  values: FormValues;
  tokens;
}

export const StepAuthInvestAssets: StatelessComponent<
  StepAuthInvestAssetsProps
> = ({ errors, handleBlur, handleChange, touched, values, tokens }) => (
  <div className="setup__step">
    <style jsx={true}>{styles}</style>
    <h3>Authorized Investment Assets</h3>
    <MultiDropdown
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.authInvestAssets}
      options={tokens}
      name="authInvestAssets"
      error={
        !!touched.authInvestAssets &&
        !!errors.authInvestAssets &&
        errors.authInvestAssets
      }
    />
  </div>
);

export default StepAuthInvestAssets;
