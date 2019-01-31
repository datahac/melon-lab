import * as R from 'ramda';
import * as Tm from '@melonproject/token-math';
import { withFormik } from 'formik';
import { withHandlers, compose } from 'recompose';
import { FormErrors } from '~/components/OrderForm';
import * as kyberPriceQuery from '~/queries/kyberPrice.gql';

const withForm = withFormik({
  mapPropsToValues: props => props.formValues,
  validate: (values, props) => {
    const errors: FormErrors = {};

    if (!values.price) {
      errors.price = 'Required';
    } else if (Tm.isZero(values.price.quote)) {
      errors.price = 'Invalid price';
    }

    if (!values.quantity) {
      errors.quantity = 'Required';
    } else if (Tm.isZero(values.quantity)) {
      errors.quantity = 'Invalid quantity';
    } else if (
      Tm.greaterThan(values.quantity, props.baseToken) &&
      values.type === 'Sell'
    ) {
      errors.quantity = 'Insufficient balance';
    }

    if (!values.total) {
      errors.total = 'Required';
    } else if (Tm.isZero(values.total)) {
      errors.total = 'Invalid total';
    } else if (
      Tm.greaterThan(values.total, props.quoteToken) &&
      values.type === 'Buy'
    ) {
      errors.total = 'Insufficient balance';
    }

    return errors;
  },
  enableReinitialize: true,
  handleSubmit: (values, form) => form.props.setOrderFormValues(values),
});

const withFormHandlers = withHandlers({
  onChange: props => async event => {
    const { resetForm, setFieldValue, baseToken, quoteToken, values } = props;
    const { name, value } = event.target;

    const updateKyberPrice = (
      quantity = R.pathOr(
        '1000000000000000000',
        ['quantity', 'quantity'],
        values,
      ).toString(),
    ) => {
      return props.client.query({
        query: kyberPriceQuery,
        variables: {
          quantity,
          symbol: props.baseToken.token.symbol,
          type: values.type && values.type.toUpperCase(),
        },
      });
    };

    if (name === 'type' || name === 'strategy' || name === 'exchange') {
      setFieldValue(name, value);
    }

    // Reset form on exchange change
    if (name === 'exchange') {
      resetForm({
        price: '',
        quantity: '',
        total: '',
        exchange: value,
        id: null,
        signedOrder: null,
        strategy: values.strategy,
        type: values.type,
      });
    }

    // Set kyber price
    if (name === 'exchange' && value === 'KYBER_NETWORK') {
      const { data } = await updateKyberPrice();
      !!data && setFieldValue('price', data.kyberPrice);
    }

    if (name === 'price') {
      const price = Tm.createPrice(
        Tm.createQuantity(baseToken.token, 1),
        Tm.createQuantity(quoteToken.token, value || 0),
      );
      setFieldValue('price', price);

      if (values.quantity) {
        const total = Tm.valueIn(price, values.quantity);
        setFieldValue('total', total);
      }
    }

    if (name === 'quantity') {
      const quantity = Tm.createQuantity(baseToken.token, value || 0);
      setFieldValue('quantity', quantity);

      if (values.price) {
        const total = Tm.valueIn(values.price, quantity);
        setFieldValue('total', total);
      }
    }

    if (name === 'total') {
      const total = Tm.createQuantity(quoteToken.token, value || 0);
      setFieldValue('total', total);

      if (values.price) {
        const quantity = Tm.valueIn(values.price, total);
        setFieldValue('quantity', quantity);
      }
    }
  },
});

export default compose(
  withForm,
  withFormHandlers,
);
