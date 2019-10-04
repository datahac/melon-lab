import * as Tm from '@melonproject/token-math';
import * as R from 'ramda';
import { withFormik } from 'formik';
import { withHandlers, compose } from 'recompose';
import { FormErrors } from '~/components/ParticipationForm';
import gql from 'graphql-tag';
import displayQuantity from '~/utils/displayQuantity';

export const balanceQuery = gql`
  query BalanceQuery($account: String!, $symbol: String!) {
    asset: balance(address: $account, symbol: $symbol) {
      quantity
      token {
        decimals
        symbol
        address
      }
    }
  }
`;

export const remainingQuery = gql`
  query RemainingInvestAmountQuery($address: String!, $symbol: String!) {
    fund(address: $address) {
      id
      remainingInvestAmount(asset: $symbol) {
        quantity
        token {
          address
          symbol
          decimals
        }
      }
    }
  }
`;

const balance = async props => {
  const { data } = await props.client.query({
    query: balanceQuery,
    variables: {
      account: props.account,
      symbol: props.asset,
    },
  });

  return R.path(['asset', 'quantity'], data);
};

const remaining = async props => {
  const { data } = await props.client.query({
    query: remainingQuery,
    variables: {
      address: props.address,
      symbol: props.asset,
    },
  });

  return R.path(['fund', 'remainingInvestAmount'], data);
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const validate = (values, props) => {
  return sleep(0).then(async () => {
    const errors: FormErrors = {};

    if (!values.quantity) {
      errors.quantity = 'Required';
    } else if (Tm.isZero(values.quantity)) {
      errors.quantity = 'Invalid quantity';
    }

    if (!values.price) {
      errors.price = 'Required';
    } else if (Tm.isZero(values.price.quote)) {
      errors.price = 'Invalid price';
    } else if (!Tm.isEqual(values.price.quote, props.sharePrice.quote)) {
      if (!Tm.greaterThan(values.price.quote, props.sharePrice.quote)) {
        errors.price = 'Price is too low';
      }
    }

    if (!values.total) {
      errors.total = 'Required';
    } else if (Tm.isZero(values.total)) {
      errors.total = 'Invalid quantity';
    } else {
      await (async () => {
        const remains = await remaining(props);
        if (remains !== null && Tm.greaterThan(values.total.quantity, remains.quantity)) {
          errors.total = `Maximum AUM exceeded (${displayQuantity(remains)})`;
          return;
        }

        const currentBalance = await balance(props);
        if (Tm.greaterThan(values.total.quantity, currentBalance)) {
          errors.total = `Insufficient balance (${displayQuantity(currentBalance)})`;
        }
      })();
    }

    if (Object.keys(errors).length) {
      throw errors;
    }
  });
};

const withForm = withFormik({
  mapPropsToValues: props => {
    const sharePrice =
      props.sharePrice &&
      Tm.createPrice(props.sharePrice.base, {
        ...props.sharePrice.quote,
        quantity: Tm.add(props.sharePrice.quote.quantity, Tm.divide(props.sharePrice.quote.quantity, 10)),
      });

    return {
      price: props.isInitialRequest ? props.sharePrice : sharePrice,
      total: props.sharePrice && Tm.createQuantity(props.sharePrice.quote.token, 0),
      quantity: props.sharePrice && Tm.createQuantity(props.sharePrice.base.token, 0),
    };
  },
  validate,
  enableReinitialize: true,
  handleSubmit: (values, form) => {
    form.props.setInvestValues(values);
    form.props.setStep(1);
  },
});

const withFormHandlers = compose(
  withHandlers({
    handleChange: props => event => {
      const { name, value } = event.target;
      const { values, sharePrice } = props;

      if (name === 'price') {
        const price = Tm.createPrice(
          Tm.createQuantity(sharePrice.base.token, 1),
          Tm.createQuantity(sharePrice.quote.token, value || 0),
        );
        props.setFieldValue('price', price);

        if (values.quantity) {
          const total = Tm.valueIn(price, values.quantity);
          props.setFieldValue('total', total);
        }
      }

      if (name === 'quantity') {
        const quantity = Tm.createQuantity(props.sharePrice.base.token, parseFloat(value) || 0);
        props.setFieldValue('quantity', quantity);

        const total = Tm.valueIn(values.price, quantity);
        if (!Tm.isEqual(values.total.quantity, total.quantity)) {
          props.setFieldValue('total', total);
        }
      }

      if (name === 'total') {
        const total = Tm.createQuantity(props.sharePrice.quote.token, parseFloat(value) || 0);
        props.setFieldValue('total', total);

        const quantity = Tm.valueIn(values.price, total);
        if (!Tm.isEqual(values.quantity.quantity, quantity.quantity)) {
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
