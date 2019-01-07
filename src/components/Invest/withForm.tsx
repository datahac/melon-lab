import { withFormik } from 'formik';
import { withHandlers, compose } from 'recompose';
import { createQuantity, isEqual } from '@melonproject/token-math/quantity';
import { valueIn } from '@melonproject/token-math/price';
import { isZero } from '@melonproject/token-math/bigInteger';
import { FormErros } from '~/components/ParticipationForm';

const withForm = withFormik({
  mapPropsToValues: props => ({
    price: props.sharePrice,
    total: props.sharePrice && createQuantity(props.sharePrice.quote.token, 0),
    quantity:
      props.sharePrice && createQuantity(props.sharePrice.base.token, 0),
    type: 'Invest',
  }),
  validate: values => {
    let errors: FormErros = {};

    if (!values.quantity) {
      errors.quantity = 'Required';
    } else if (isZero(values.quantity.quantity)) {
      errors.quantity = 'Invalid quantity';
    }

    if (!values.total) {
      errors.total = 'Required';
    } else if (isZero(values.total.quantity)) {
      errors.total = 'Invalid quantity';
    }

    return errors;
  },
  enableReinitialize: true,
  handleSubmit: (values, form) => form.props.setInvestValues(values),
});

const withFormHandlers = compose(
  withHandlers({
    handleChange: props => event => {
      const { name, value } = event.target;
      const { values } = props;

      if (name === 'quantity') {
        const quantity = createQuantity(
          props.sharePrice.base.token,
          parseFloat(value) || 0,
        );
        props.setFieldValue('quantity', quantity);

        const total = valueIn(values.price, quantity);
        if (!isEqual(values.total, total)) {
          props.setFieldValue('total', total);
        }
      }

      if (name === 'total') {
        const total = createQuantity(
          props.sharePrice.quote.token,
          parseFloat(value) || 0,
        );
        props.setFieldValue('total', total);

        const quantity = valueIn(values.price, total);
        if (!isEqual(values.quantity, quantity)) {
          props.setFieldValue('quantity', quantity);
        }
      }
    },
  }),
);

export default compose(
  withForm,
  withFormHandlers,
);
