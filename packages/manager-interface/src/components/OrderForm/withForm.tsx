import { withFormik } from 'formik';
import * as Yup from 'yup';
import {
  divide,
  greaterThan,
  max,
  min,
  multiply,
} from '~/utils/functionalBigNumber';
import { withHandlers } from 'recompose';

const formCalculation = (props, field, value) => {
  const { values, info } = props;
  let maxTotal;
  let maxQuantity;

  const typeValue = field === 'type' ? value : values.orderType;
  const totalValue = field === 'total' ? value : values.total;
  const quantityValue = field === 'quantity' ? value : values.quantity;

  if (values.strategy === 'Market') {
    maxTotal =
      typeValue === 'Buy'
        ? min(info.tokens.quoteToken.balance, totalValue)
        : totalValue;
    maxQuantity =
      typeValue === 'Sell'
        ? max(info.tokens.baseToken.balance, quantityValue)
        : quantityValue;
  } else if (values.strategy === 'Limit') {
    maxTotal = typeValue === 'Buy' ? info.tokens.quoteToken.balance : Infinity;
    maxQuantity =
      typeValue === 'Sell' ? info.tokens.baseToken.balance : Infinity;
  }

  if (field === 'total') {
    if (greaterThan(value, maxTotal)) {
      props.setFieldValue('total', maxTotal);
    } else if (values.price) {
      const quantity = divide(value, values.price).toString(10);
      if (values.quantity !== value) {
        props.setFieldValue('quantity', quantity);
      }
    }
  }

  if (field === 'quantity') {
    if (greaterThan(value, maxQuantity)) {
      props.setFieldValue('quantity', maxQuantity);
    } else if (values.price) {
      const total = multiply(value, values.price).toString(10);
      if (values.total !== value) {
        props.setFieldValue('total', total);
      }
    }
  }

  if (field === 'price' && values.quantity) {
    const total = multiply(values.quantity, value).toString(10);
    props.setFieldValue('total', total);
  }
};

const validation = props => {
  const numberFormat = (0).toFixed(props.decimals || 4);
  const minNumber = numberFormat.slice(0, -1) + '1';

  return Yup.object().shape({
    price: Yup.number()
      .min(minNumber, `Minimum price is ${minNumber}`)
      .required('Price is required.'),
    quantity: Yup.number()
      .min(minNumber, `Minimum quantity is ${minNumber}`)
      .required('Quantity is required.'),
    total: Yup.number()
      .min(minNumber, `Minimum total is ${minNumber}`)
      .required('Total is required.'),
  });
};

const initialValues = {
  price: '',
  type: 'sell',
  strategy: 'Market',
  quantity: '',
  total: '',
  exchange: '',
};

const withForm = withFormik({
  mapPropsToValues: props =>
    props.formValues ? { ...props.formValues } : initialValues,
  validationSchema: props => validation(props),
  enableReinitialize: true,
  handleSubmit: (values, form) =>
    form.props.onSubmit && form.props.onSubmit(values),
});

const withFormHandlers = withHandlers({
  onChange: props => event => {
    const { setFieldValue } = props;
    const { name, value } = event.target;

    setFieldValue(name, value);
    formCalculation(props, name, value);
  },
});

export { withForm, withFormHandlers };
