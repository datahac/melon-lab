import { withFormik } from 'formik';
import * as Yup from 'yup';

import PasswordForm from './index';

const withFormValidation = withFormik({
  mapPropsToValues: props => ({ ...props.initialValues }),
  validationSchema: Yup.object().shape({
    password: Yup.string()
      .required('Password is required.')
      .min(8, 'Password needs to be at least 8 chars long. For your security!'),
  }),
  enableReinitialize: true,
  handleSubmit: (values, form) =>
    form.props.onSubmit && form.props.onSubmit(values, 'passwordForm'),
});

export default withFormValidation(PasswordForm);
