import { withFormik } from 'formik';
import { withHandlers, compose } from 'recompose';
import {
  createQuantity,
  isZero,
  greaterThan,
} from '@melonproject/token-math/quantity';
import { valueIn } from '@melonproject/token-math/price';
import { createPrice } from '@melonproject/token-math/price';
import { FormErros } from '~/components/OrderForm';

const initialValues = {
  type: 'Buy',
  strategy: 'Market',
  quantity: null,
  total: null,
  price: null,
  exchange: null,
};

const withForm = withFormik({
  mapPropsToValues: props =>
    props.formValues ? props.formValues : initialValues,
  validate: (values, props) => {
    let errors: FormErros = {};

    if (!values.price) {
      errors.price = 'Required';
    } else if (isZero(values.price.quote)) {
      errors.price = 'Invalid price';
    }

    if (!values.quantity) {
      errors.quantity = 'Required';
    } else if (isZero(values.quantity)) {
      errors.quantity = 'Invalid quantity';
    } else if (
      greaterThan(values.quantity, props.baseToken) &&
      values.type === 'Sell'
    ) {
      errors.quantity = 'Insufficient balance';
    }

    if (!values.total) {
      errors.total = 'Required';
    } else if (isZero(values.total)) {
      errors.total = 'Invalid total';
    } else if (
      greaterThan(values.total, props.quoteToken) &&
      values.type === 'Buy'
    ) {
      errors.total = 'Insufficient balance';
    }

    return errors;
  },
  enableReinitialize: true,
  handleSubmit: (values, form) =>
    form.props.onSubmit && form.props.onSubmit(values),
});

const withFormHandlers = withHandlers({
  onChange: props => event => {
    const { setFieldValue, baseToken, quoteToken, values } = props;
    const { name, value } = event.target;

    if (name === 'type' || name === 'strategy') {
      setFieldValue(name, value);
    }

    if (name === 'price') {
      const price = createPrice(
        createQuantity(baseToken.token, 1),
        createQuantity(quoteToken.token, value || 0),
      );
      setFieldValue('price', price);

      if (values.quantity) {
        const total = valueIn(price, values.quantity);
        setFieldValue('total', total);
      }
    }

    if (name === 'quantity') {
      const quantity = createQuantity(baseToken.token, value || 0);
      setFieldValue('quantity', quantity);

      if (values.price) {
        const total = valueIn(values.price, quantity);
        setFieldValue('total', total);
      }
    }

    if (name === 'total') {
      const total = createQuantity(quoteToken.token, value || 0);
      setFieldValue('total', total);

      if (values.price) {
        const quantity = valueIn(values.price, total);
        setFieldValue('quantity', quantity);
      }
    }
  },
});

export default compose(
  withForm,
  withFormHandlers,
);
