import React from 'react';
import { compose, withProps, withPropsOnChange } from 'recompose';
import OrderForm from '~/components/OrderForm/container';

const withOrderFormProps = withProps(props => ({
  decimals: 4,
}));

const withMappedProps = withPropsOnChange(
  ['holdings', 'baseAsset', 'quoteAsset'],
  props => ({
    // TODO: isCompetition?
    isCompetition: false,
    isManager: props.isManager,
    info: {
      tokens: {
        baseToken: {
          name: props.baseAsset,
          balance:
            props.holdings && props.holdings.length
              ? props.holdings
                  .find(a => a.symbol === props.baseAsset)
                  .balance.toString(10)
              : undefined,
        },
        quoteToken: {
          name: props.quoteAsset,
          balance:
            props.holdings && props.holdings.length
              ? props.holdings
                  .find(a => a.symbol === props.quoteAsset)
                  .balance.toString(10)
              : undefined,
        },
      },
    },
  }),
);

const withGetStarted = BaseComponent => baseProps => (
  <BaseComponent {...baseProps} />
);

export default compose(
  withOrderFormProps,
  withMappedProps,
  withGetStarted,
)(OrderForm);
