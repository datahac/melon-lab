import React, { Fragment } from 'react';
import * as R from 'ramda';
import Composer from 'react-composer';
import { Query } from 'react-apollo';
import * as Tm from '@melonproject/token-math';

import OrderForm from '~/components/OrderForm';
import { NetworkConsumer } from '+/components/NetworkContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import MakeOrder from '+/components/MakeOrder';
import TakeOrder from '+/components/TakeOrder';
import withForm from './withForm';
import isSameAddress from '~/shared/utils/isSameAddress';
import availableExchanges from '~/shared/utils/availableExchanges';

import * as kyberPriceQuery from '~/queries/kyberPrice.gql';

const WrappedOrderForm = withForm(props => {
  const limitExchanges = Object.keys(
    R.omit(['KYBER_NETWORK', 'ETHFINEX'], availableExchanges),
  ).reduce(
    (carry, current) =>
      carry.concat([
        {
          name: availableExchanges[current],
          value: current,
        },
      ]),
    [],
  );

  const marketExchanges = Object.keys(availableExchanges).reduce(
    (carry, current) =>
      carry.concat([
        {
          name: availableExchanges[current],
          value: current,
        },
      ]),
    [],
  );

  return (
    <Fragment>
      <MakeOrder
        values={props.orderFormValues}
        setOrderFormValues={props.setOrderFormValues}
        resetForm={props.resetForm}
      />
      <TakeOrder
        values={props.orderFormValues}
        setOrderFormValues={props.setOrderFormValues}
        resetForm={props.resetForm}
        setOrder={props.setOrder}
      />
      <OrderForm
        {...props}
        setOrderFormValues={props.setOrderFormValues}
        limitExchanges={limitExchanges}
        marketExchanges={marketExchanges}
        // kyberPrice={result.data.kyberPrice}
      />
    </Fragment>
  );
});

export default class OrderFormContainer extends React.PureComponent {
  state = {
    values: null,
    kyberQuery: null,
  };

  setKyberQuery = query => {
    if (query) {
      const { type, quantity, symbol } = query;
      this.setState({ kyberQuery: { type, quantity, symbol } });
    } else {
      this.setState({ kyberQuery: null });
    }
  };

  setOrderFormValues = values => {
    this.setState({
      values,
    });
  };

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
      <Composer
        components={[
          <NetworkConsumer />,
          <FundManagerConsumer />,
          <Query
            query={kyberPriceQuery}
            variables={this.state.kyberQuery}
            skip={!this.state.kyberQuery}
          />,
        ]}
      >
        {([network, managerProps, result]) => {
          const {
            address,
            quoteAsset,
            baseAsset,
            holdings,
            formValues,
            setOrder,
          } = this.props;

          const kyberPrice = result.data && result.data.kyberPrice;

          const formValuesWithKyberPrice = kyberPrice
            ? {
                ...formValues,
                price: kyberPrice,
              }
            : formValues;

          const isManager =
            !!managerProps.fund && isSameAddress(managerProps.fund, address);

          return (
            <WrappedOrderForm
              setOrderFormValues={this.setOrderFormValues}
              baseToken={this.getTokenBalance(baseAsset)}
              quoteToken={this.getTokenBalance(quoteAsset)}
              isCompetition={false}
              isManager={isManager}
              holdings={holdings}
              formValues={formValuesWithKyberPrice}
              priceFeedUp={network && network.priceFeedUp}
              orderFormValues={this.state.values}
              kyberPrice={kyberPrice}
              setKyberQuery={this.setKyberQuery}
              setOrder={setOrder}
            />
          );
        }}
      </Composer>
    );
  }
}
