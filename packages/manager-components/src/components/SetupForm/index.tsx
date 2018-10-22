import React, { StatelessComponent } from 'react';
import Form from '~/blocks/Form';

import styles from './styles.css';

export interface SetupFormProps {
  handleSubmit;
}

export const SetupForm: StatelessComponent<SetupFormProps> = ({
  children,
  handleSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <style jsx>{styles}</style>
      {children}
    </Form>
  );
};

export default SetupForm;
