import React, { StatelessComponent } from 'react';

export interface FormProps {
  onSubmit?: () => any;
}

const Form: StatelessComponent<FormProps> = ({ children, onSubmit }) => (
  <form onSubmit={onSubmit} className="form">
    {children}
  </form>
);

export default Form;
