import { withFormik } from 'formik';
import * as Yup from 'yup';

export default withFormik({
  mapPropsToValues: () => ({ password: '' }),
  validationSchema: Yup.object().shape({
    password: Yup.string().required('Password is required.'),
  }),
  enableReinitialize: true,
  handleSubmit: (values, form) => form.props.onSubmit && form.props.onSubmit(values),
});
