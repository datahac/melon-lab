import React from 'react';
import Composer from 'react-composer';
import OrderForm from '~/components/OrderForm';
import { NetworkConsumer } from '+/components/NetworkContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import { withForm, withFormHandlers } from './withForm';
import isSameAddress from '~/utils/isSameAddress';
import { compose } from 'recompose';

const WrappedOrderForm = compose(
  withForm,
  withFormHandlers,
)(OrderForm);

export default class OrderFormContainer extends React.PureComponent {
  getTokenBalance = asset => {
    const { holdings } = this.props;
    return {
      name: asset,
      balance:
        holdings &&
        holdings.length &&
        holdings.find(holding => holding.symbol === asset).balance.toString(10),
    };
  };

  render() {
    return (
      <Composer components={[<NetworkConsumer />, <FundManagerConsumer />]}>
        {([network, associatedFund]) => {
          const {
            address,
            quoteAsset,
            baseAsset,
            holdings,
            formValues,
          } = this.props;

          const isManager =
            !!associatedFund && isSameAddress(associatedFund, address);

          const tokens = {
            baseToken: this.getTokenBalance(this.props.baseAsset),
            quoteToken: this.getTokenBalance(this.props.quoteAsset),
          };

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
