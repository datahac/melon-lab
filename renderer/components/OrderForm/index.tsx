import React, { Fragment } from 'react';
import * as R from 'ramda';
import Composer from 'react-composer';
import { withApollo } from 'react-apollo';
import { compose } from 'recompose';
import OrderForm from '~/components/OrderForm';
import { NetworkConsumer } from '+/components/NetworkContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import MakeOrder from '+/components/MakeOrder';
import TakeOrder from '+/components/TakeOrder';
import withForm from './withForm';
import isSameAddress from '~/shared/utils/isSameAddress';
import availableExchanges from '~/shared/utils/availableExchanges';

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

class OrderFormContainer extends React.PureComponent {
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
      <Composer components={[<NetworkConsumer />, <FundManagerConsumer />]}>
        {([network, managerProps]) => {
          const {
            address,
            quoteAsset,
            baseAsset,
            holdings,
            setOrder,
            formValues,
          } = this.props;

          const isManager =
            !!managerProps.fund && isSameAddress(managerProps.fund, address);

          return (
            <WrappedOrderForm
              {...this.props}
              setOrderFormValues={this.setOrderFormValues}
              baseToken={this.getTokenBalance(baseAsset)}
              quoteToken={this.getTokenBalance(quoteAsset)}
              isCompetition={false}
              isManager={isManager}
              holdings={holdings}
              formValues={formValues}
              priceFeedUp={network && network.priceFeedUp}
              orderFormValues={this.state.values}
              setKyberQuery={this.setKyberQuery}
              setOrder={setOrder}
            />
          );
        }}
      </Composer>
    );
  }
}

export default compose(withApollo)(OrderFormContainer);
