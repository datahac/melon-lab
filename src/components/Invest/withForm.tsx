import * as Tm from '@melonproject/token-math';
import { withFormik } from 'formik';
import { withHandlers, compose } from 'recompose';
import { FormErros } from '~/components/ParticipationForm';

const withForm = withFormik({
  mapPropsToValues: props => ({
    price: props.sharePrice,
    total:
      props.sharePrice &&
      Tm.quantity.createQuantity(props.sharePrice.quote.token, 0),
    quantity:
      props.sharePrice &&
      Tm.quantity.createQuantity(props.sharePrice.base.token, 0),
    type: 'Invest',
  }),
  validate: values => {
    let errors: FormErros = {};

    if (!values.quantity) {
      errors.quantity = 'Required';
    } else if (Tm.bigInteger.izZero(values.quantity.quantity)) {
      errors.quantity = 'Invalid quantity';
    }

    if (!values.total) {
      errors.total = 'Required';
    } else if (Tm.bigInteger.izZero(values.total.quantity)) {
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
        const quantity = Tm.quantity.createQuantity(
          props.sharePrice.base.token,
          parseFloat(value) || 0,
        );
        props.setFieldValue('quantity', quantity);

        const total = Tm.price.valueIn(values.price, quantity);
        console.log(values.total, total);
        if (!Tm.quantity.isEqual(values.total, total)) {
          props.setFieldValue('total', total);
        }
      }

      if (name === 'total') {
        const total = Tm.quantity.createQuantity(
          props.sharePrice.quote.token,
          parseFloat(value) || 0,
        );
        props.setFieldValue('total', total);

        const quantity = Tm.price.valueIn(values.price, total);
        if (!Tm.bigInteger.isEqual(values.quantity, quantity)) {
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
