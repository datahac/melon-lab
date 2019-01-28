import * as R from 'ramda';
import * as Tm from '@melonproject/token-math';
import { withFormik } from 'formik';
import { withHandlers, compose } from 'recompose';
import { FormErros } from '~/components/OrderForm';

const withForm = withFormik({
  mapPropsToValues: props => props.formValues,
  validate: (values, props) => {
    const errors: FormErros = {};

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
  onChange: props => event => {
    const {
      setFieldValue,
      baseToken,
      quoteToken,
      values,
      setFieldTouched,
      setKyberQuery,
      setOrder,
    } = props;
    const { name, value } = event.target;

    if (name === 'type' || name === 'strategy' || name === 'exchange') {
      setFieldValue(name, value);
    }

    // console.log(props, baseToken);

    // Reset form on exchange change
    if (name === 'exchange') {
      setFieldValue('total', Tm.createQuantity(quoteToken.token, 0));
      setFieldValue('quantity', Tm.createQuantity(baseToken.token, 0));
      setFieldTouched('total', false);
      setFieldTouched('quantity', false);
      setOrder({
        exchange: value,
        strategy: values.strategy,
        type: values.type,
      });
    }

    const updateKyberQuery = (
      quantity = R.pathOr(
        '1000000000000000000',
        ['quantity', 'quantity'],
        values,
      ).toString(),
    ) => {
      setKyberQuery({
        quantity,
        symbol: props.baseToken.token.symbol,
        type: values.type && values.type.toUpperCase(),
      });
    };

    // Disable kyber price query as soon as it is unselected
    if (name === 'exchange' && value !== 'KYBER_NETWORK') {
      props.setKyberQuery(null);
    } else {
      updateKyberQuery();
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

      updateKyberQuery(quantity.quantity.toString());

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
        updateKyberQuery(quantity.quantity.toString());
        setFieldValue('quantity', quantity);
      } else {
        updateKyberQuery();
      }
    }
  },
});

export default compose(
  withForm,
  withFormHandlers,
);
