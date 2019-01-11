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
        decimals: R.pathOr(18, ['token', 'decimals'], balance),
        address: R.pathOr('', ['token', 'address'], balance),
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

          return (
            <WrappedOrderForm
              baseToken={this.getTokenBalance(baseAsset)}
              quoteToken={this.getTokenBalance(quoteAsset)}
              isCompetition={false}
              isManager={isManager}
              holdings={holdings}
              formValues={formValues}
              priceFeedUp={network && network.priceFeedUp}
            />
          );
        }}
      </Composer>
    );
  }
}
