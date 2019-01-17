import React, { Fragment } from 'react';
import * as R from 'ramda';
import Composer from 'react-composer';
import OrderForm from '~/components/OrderForm';
import { NetworkConsumer } from '+/components/NetworkContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import MakeOrder from '+/components/MakeOrder';
import withForm from './withForm';
import isSameAddress from '~/utils/isSameAddress';

const WrappedOrderForm = withForm(props => (
  <Fragment>
    <MakeOrder
      values={props.orderFormValues}
      setOrderFormValues={props.setOrderFormValues}
      resetForm={props.resetForm}
    />

    <OrderForm {...props} setOrderFormValues={props.setOrderFormValues} />
  </Fragment>
));

export default class OrderFormContainer extends React.PureComponent {
  state = {
    values: null,
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
            formValues,
          } = this.props;

          const isManager =
            !!managerProps.fund && isSameAddress(managerProps.fund, address);

          return (
            <Fragment>
              <WrappedOrderForm
                setOrderFormValues={this.setOrderFormValues}
                baseToken={this.getTokenBalance(baseAsset)}
                quoteToken={this.getTokenBalance(quoteAsset)}
                isCompetition={false}
                isManager={isManager}
                holdings={holdings}
                formValues={formValues}
                priceFeedUp={network && network.priceFeedUp}
                orderFormValues={this.state.values}
              />
            </Fragment>
          );
        }}
      </Composer>
    );
  }
}
