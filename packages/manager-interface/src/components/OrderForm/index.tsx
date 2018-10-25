import { formCalculation, withForm } from './withForm';
import OrderForm from '~/components/OrderForm';
import React from 'react';
import Composer from 'react-composer';
import { NetworkConsumer } from '+/components/NetworkContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import isSameAddress from '~/utils/isSameAddress';

const WrappedOrderForm = withForm(OrderForm);

export default class OrderFormContainer extends React.PureComponent {
  onChange = event => {
    this.props.setFieldValue(event.target.name, event.target.value);
    formCalculation(this.props, event.target.name, event.target.value);
  };

  render() {
    const info = {
      tokens: {
        baseToken: {
          name: this.props.baseAsset,
          balance:
            this.props.holdings && this.props.holdings.length
              ? this.props.holdings
                  .find(a => a.symbol === this.props.baseAsset)
                  .balance.toString(10)
              : undefined,
        },
        quoteToken: {
          name: this.props.quoteAsset,
          balance:
            this.props.holdings && this.props.holdings.length
              ? this.props.holdings
                  .find(a => a.symbol === this.props.quoteAsset)
                  .balance.toString(10)
              : undefined,
        },
      },
    };

    return (
      <Composer components={[<NetworkConsumer />, <FundManagerConsumer />]}>
        {([network, associatedFund]) => {
          const {
            address,
            quoteAsset,
            baseAsset,
            holdings,
            decimals = 4,
            formValues,
          } = this.props;

          const isManager =
            !!associatedFund && isSameAddress(associatedFund, address);

          return (
            <WrappedOrderForm
              info={info}
              isCompetition={false}
              isManager={isManager}
              holdings={holdings}
              decimals={decimals}
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
