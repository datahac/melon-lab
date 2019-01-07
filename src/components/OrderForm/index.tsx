import React from 'react';
import * as R from 'ramda';
import Composer from 'react-composer';
import OrderForm from '~/components/OrderForm';
import { NetworkConsumer } from '+/components/NetworkContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import withForm from './withForm';
import isSameAddress from '~/utils/isSameAddress';

const WrappedOrderForm = withForm(OrderForm);

export default class OrderFormContainer extends React.PureComponent {
  getTokenBalance = asset => {
    const { holdings } = this.props;
    const balance = R.compose(
      R.propOr(0, 'balance'),
      R.find(holding => holding.balance.token.symbol === asset),
    )(holdings);

    return {
      quantity: R.pathOr(0, ['quantity'], balance),
      token: {
        ...balance.token,
        symbol: R.pathOr(asset, ['token', 'symbol'], balance),
      },
    };
  };

  render() {
    return (
      <Composer components={[<NetworkConsumer />, <FundManagerConsumer />]}>
        {([network, managerProps]) => {
          const {
            address,
            quoteAsset,
            baseAsset,
            holdings,
            formValues,
          } = this.props;

          const isManager =
            !!managerProps.fund && isSameAddress(managerProps.fund, address);

          const tokens = {
            baseToken: this.getTokenBalance(this.props.baseAsset),
            quoteToken: this.getTokenBalance(this.props.quoteAsset),
          };

          console.log(tokens);

          return (
            <WrappedOrderForm
              tokens={tokens}
              isCompetition={false}
              isManager={isManager}
              holdings={holdings}
              quoteAsset={quoteAsset}
              baseAsset={baseAsset}
              formValues={formValues}
              priceFeedUp={network && network.priceFeedUp}
            />
          );
        }}
      </Composer>
    );
  }
}
