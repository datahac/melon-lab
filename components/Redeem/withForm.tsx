import * as Tm from '@melonproject/token-math';
import { withFormik } from 'formik';
import { withHandlers, compose } from 'recompose';
import { FormErrors } from '~/components/ReedemForm';

const withForm = withFormik({
  mapPropsToValues: props => ({
    quantity: props.sharePrice && Tm.createQuantity(props.sharePrice.base.token, 0),
  }),
  validate: values => {
    let errors: FormErrors = {};

    if (!values.quantity) {
      errors.quantity = 'Required';
    } else if (Tm.isZero(values.quantity)) {
      errors.quantity = 'Invalid quantity';
    }

    return errors;
  },
  enableReinitialize: true,
  handleSubmit: (values, form) => form.props.setRedeemValues(values),
});

const withFormHandlers = compose(
  withHandlers({
    handleChange: props => event => {
      const { name, value } = event.target;

      if (name === 'quantity') {
        const quantity = Tm.createQuantity(props.sharePrice.base.token, parseFloat(value) || 0);
        props.setFieldValue('quantity', quantity);
      }
    },
  }),
);

export default compose(
  withForm,
  withFormHandlers,
);
