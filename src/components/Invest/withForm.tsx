import * as Tm from '@melonproject/token-math';
import { withFormik } from 'formik';
import { withHandlers, compose } from 'recompose';
import { FormErros } from '~/components/ParticipationForm';

const withForm = withFormik({
  mapPropsToValues: props => ({
    price: props.sharePrice,
    total:
      props.sharePrice && Tm.createQuantity(props.sharePrice.quote.token, 0),
    quantity:
      props.sharePrice && Tm.createQuantity(props.sharePrice.base.token, 0),
    type: 'Invest',
  }),
  validate: values => {
    let errors: FormErros = {};

    if (!values.quantity) {
      errors.quantity = 'Required';
    } else if (Tm.izZero(values.quantity.quantity)) {
      errors.quantity = 'Invalid quantity';
    }

    if (!values.total) {
      errors.total = 'Required';
    } else if (Tm.izZero(values.total.quantity)) {
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
        const quantity = Tm.createQuantity(
          props.sharePrice.base.token,
          parseFloat(value) || 0,
        );
        props.setFieldValue('quantity', quantity);

        const total = Tm.valueIn(values.price, quantity);
        if (!Tm.isEqual(values.total, total)) {
          props.setFieldValue('total', total);
        }
      }

      if (name === 'total') {
        const total = Tm.createQuantity(
          props.sharePrice.quote.token,
          parseFloat(value) || 0,
        );
        props.setFieldValue('total', total);

        const quantity = Tm.valueIn(values.price, total);
        if (!Tm.isEqual(values.quantity, quantity)) {
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
