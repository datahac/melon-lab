import { withFormik } from 'formik';
import * as Yup from 'yup';

const withForm = withFormik({
  mapPropsToValues: props => ({
    gasPrice: props.gasPrice,
  }),
  validationSchema: props =>
    Yup.object().shape({
      gasPrice: Yup.number()
        .required('Gas price is required.')
        .moreThan(0, 'Please enter a valid gas price'),
    }),
  enableReinitialize: true,
  handleSubmit: (values, form) => {
    form.props.execute(values.gasPrice);
  },
});

export default withForm;
