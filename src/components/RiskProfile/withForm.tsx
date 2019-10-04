import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withHandlers, compose } from 'recompose';
import availablePolicies from '~/utils/availablePolicies';

const initialValues = {
  policies: {},
};

const withForm = withFormik({
  mapPropsToValues: props => {
    if (!!props.formValues) {
      return props.formValues;
    }

    return initialValues;
  },
  validationSchema: props =>
    Yup.object().shape({
      policies: Yup.object().shape({
        priceTolerance: Yup.number()
          .typeError('Price tolerance fee is required')
          .positive('Fee must be positive')
          .max(100, 'Fee can not be greater than 100')
          .integer('Fee must be an integer'),
        maxPositions: Yup.number()
          .typeError('Price tolerance fee is required')
          .positive('Fee must be positive')
          .integer('Fee must be an integer'),
        maxConcentration: Yup.number()
          .typeError('Price tolerance fee is required')
          .positive('Fee must be positive')
          .max(100, 'Fee can not be greater than 100')
          .integer('Fee must be an integer'),
      }),
    }),
  enableReinitialize: true,
  handleSubmit: (values, form) => form.props.setFormValues(values),
});

const withFormHandlers = withHandlers({
  onActivatePolicy: props => value => {
    if (value in props.values.policies) {
      const tempValues = props.values.policies;
      delete tempValues[value];
      props.setFieldValue('policies', tempValues);
    } else {
      props.setFieldValue('policies', {
        ...props.values.policies,
        [value]: availablePolicies()[value].defaultValue,
      });
    }
  },
});

export default compose(
  withForm,
  withFormHandlers,
);
