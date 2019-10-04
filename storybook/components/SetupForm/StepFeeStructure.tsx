import React, { StatelessComponent } from 'react';
import Input from '~/blocks/Input';

import styles from './styles.css';

interface FormValues {
  fees: {
    managementFee: string;
    performanceFee: string;
    feePeriod: string;
  };
}

export interface StepFeeStructureProps {
  errors?: any;
  handleBlur?: () => void;
  handleChange?: () => void;
  handleSubmit?: () => void;
  touched?: any;
  values: FormValues;
}

export const StepFeeStructure: StatelessComponent<StepFeeStructureProps> = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
}) => (
  <div className="setup__step">
    <style jsx={true}>{styles}</style>
    <h3>Fee structure</h3>
    <h4>Management fee (%)</h4>
    <Input
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.fees && values.fees.managementFee}
      required={true}
      name="fees.managementFee"
      type="number"
      placeholder="Management fee in %"
      error={!!touched.fees && !!touched.fees.managementFee && !!errors.fees && errors.fees.managementFee}
    />
    <h4>Performance fee (%)</h4>
    <Input
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.fees && values.fees.performanceFee}
      required={true}
      name="fees.performanceFee"
      type="number"
      placeholder="Performance fee in %"
      error={!!touched.fees && !!touched.fees.performanceFee && !!errors.fees && errors.fees.performanceFee}
    />
    <h4>Performance fee period (days)</h4>
    <Input
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.fees && values.fees.feePeriod}
      required={true}
      name="fees.feePeriod"
      type="number"
      placeholder="Fee period in days"
      error={!!touched.fees && !!touched.fees.feePeriod && !!errors.fees && errors.fees.feePeriod}
    />
  </div>
);

export default StepFeeStructure;
