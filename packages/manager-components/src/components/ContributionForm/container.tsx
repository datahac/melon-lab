import { withFormik } from 'formik';
import { compose, withHandlers } from 'recompose';
import * as Yup from 'yup';
import { divide, multiply } from '~/utils/functionalBigNumber';

import ContributionForm from './index';

const calculateInputs = (props, field, value) => {
  const { values } = props;

  const totalValue = field === 'total' ? value : values.total;
  const amountValue = field === 'amount' ? value : values.amount;

  if (field === 'amount') {
    const total = multiply(amountValue, 60);

    if (values.total !== total) {
      props.setFieldValue('total', total);
    }
  } else if (field === 'total') {
    const amount = divide(totalValue, 60);

    if (amount !== values.amount) {
      if (values.amount !== amount) {
        props.setFieldValue('amount', amount);
      }
    }
  }
};

const withFormValidation = withFormik({
  mapPropsToValues: props => ({ ...props.initialValues }),
  validationSchema: Yup.object().shape({
    amount: Yup.number().required('Amount is required.'),
    total: Yup.number().required('Total is required.'),
  }),
  enableReinitialize: true,
  handleSubmit: (values, form) =>
    form.props.onSubmit && form.props.onSubmit(values),
});

const withFormHandler = compose(
  withHandlers({
    onChange: props => (values, event) => {
      props.setFieldValue(event.target.name, values.value);
      calculateInputs(props, event.target.name, values.value);
    },
  }),
);

export default compose(
  withFormValidation,
  withFormHandler,
)(ContributionForm);
