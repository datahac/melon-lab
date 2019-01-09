import { withFormik } from 'formik';
import { withHandlers, compose } from 'recompose';
import { createQuantity } from '@melonproject/token-math/quantity';
import { createPrice, toFixed } from '@melonproject/token-math/price';

const withForm = withFormik({
  mapPropsToValues: props => ({
    type: 'sell',
    strategy: 'Market',
    quantity: null,
    total: null,
    price: null,
    exchange: '',
  }),
  enableReinitialize: true,
  handleSubmit: (values, form) =>
    form.props.onSubmit && form.props.onSubmit(values),
});

const withFormHandlers = withHandlers({
  onChange: props => event => {
    const { setFieldValue, tokens, values } = props;
    const { name, value } = event.target;

    if (name === 'type' || name === 'strategy') {
      setFieldValue(name, value);
    }

    if (name === 'price') {
      const price = createPrice(
        createQuantity(tokens.baseToken.token, 1),
        createQuantity(tokens.quoteToken.token, value || 0),
      );
      setFieldValue('price', price);
    }

    if (name === 'quantity') {
      const quantity = createQuantity(tokens.baseToken.token, value || 0);
      props.setFieldValue('quantity', quantity);
    }

    if (name === 'total') {
      const total = createQuantity(tokens.quoteToken.token, value || 0);
      props.setFieldValue('total', total);
    }

    // let maxTotal;
    // let maxQuantity;

    // const typeValue = name === 'type' ? value : values.orderType;
    // const totalValue = name === 'total' ? value : values.total;
    // const quantityValue = name === 'quantity' ? value : values.quantity;

    // if (values.strategy === 'Market') {
    //   maxTotal =
    //     typeValue === 'Buy'
    //       ? min(tokens.quoteToken.balance, totalValue)
    //       : totalValue;
    //   maxQuantity =
    //     typeValue === 'Sell'
    //       ? max(tokens.baseToken.balance, quantityValue)
    //       : quantityValue;
    // } else if (values.strategy === 'Limit') {
    //   maxTotal = typeValue === 'Buy' ? tokens.quoteToken.balance : Infinity;
    //   maxQuantity = typeValue === 'Sell' ? tokens.baseToken.balance : Infinity;
    // }

    // if (name === 'total') {
    //   if (greaterThan(value, maxTotal)) {
    //     setFieldValue('total', maxTotal);
    //   } else if (values.price) {
    //     const quantity = divide(value, values.price).toString(10);
    //     if (values.quantity !== value) {
    //       setFieldValue('quantity', quantity);
    //     }
    //   }
    // }

    // if (name === 'quantity') {
    //   if (greaterThan(value, maxQuantity)) {
    //     setFieldValue('quantity', maxQuantity);
    //   } else if (values.price) {
    //     const total = multiply(value, values.price).toString(10);
    //     if (values.total !== value) {
    //       setFieldValue('total', total);
    //     }
    //   }
    // }

    // if (name === 'price' && values.quantity) {
    //   const total = multiply(values.quantity, value).toString(10);
    //   setFieldValue('total', total);
    // }
  },
});

export default compose(
  withForm,
  withFormHandlers,
);
