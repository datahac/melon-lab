import React, { StatelessComponent } from 'react';
import Checkbox from '~/blocks/Checkbox';
import TermsConditions from '~/components/TermsConditions';

import styles from './styles.css';

interface FormValues {
  name: string;
  exchanges: any;
  terms: boolean;
}

export interface StepTermsProps {
  errors?: any;
  handleChange?: () => void;
  touched?: any;
  values: FormValues;
}

export const StepTerms: StatelessComponent<StepTermsProps> = ({
  errors,
  handleChange,
  touched,
  values,
}) => {
  return (
    <div className="setup__step">
      <style jsx>{styles}</style>
      <h3>Terms and Conditions</h3>
      <TermsConditions />
      <Checkbox
        onInputChange={handleChange}
        defaultChecked={values.terms}
        required={true}
        name="terms"
        text="I accept the terms and conditions"
        error={touched.terms && errors.terms}
      />
    </div>
  );
};

export default StepTerms;
