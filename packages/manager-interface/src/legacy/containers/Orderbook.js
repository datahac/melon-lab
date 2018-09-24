import { connect } from 'react-redux';
import { compose, withState, withPropsOnChange } from 'recompose';
import Orderbook from '@melonproject/manager-components/components/Orderbook';
import React from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';
import { actions } from '../actions/orderbook';

const availableExchanges = [
  {
    value: 'RADAR_RELAY',
    text: 'Radar Relay',
  },
  {
    value: 'ERC_DEX',
    text: 'ERC Dex',
  },
  {
    value: 'OASIS_DEX',
    text: 'OasisDex',
  },
  {
    value: 'KYBER_NETWORK',
    text: 'Kyber',
  },
];

const subscription = gql`
  subscription OrderbookQuery(
    $baseToken: Symbol!
    $quoteToken: Symbol!
    $exchanges: [ExchangeEnum]
  ) {
    orderbook(
      baseTokenSymbol: $baseToken
      quoteTokenSymbol: $quoteToken
      exchanges: $exchanges
    ) {
      totalBuyVolume
      totalSellVolume
      buyEntries {
        volume
        order {
          ... on OasisDexOrder {
            id
          }

          ... on ZeroExOrder {
            id: salt
            expiration
            feeRecipient
            makerFee
            takerFee
            salt
            signature {
              v
              r
              s
            }
            maker
            taker
          }

          price
          sell {
            howMuch
            symbol
          }

          buy {
            howMuch
            symbol
          }
          type
          exchange
          exchangeContractAddress
          isActive
        }
      }
      sellEntries {
        volume
        order {
          ... on OasisDexOrder {
            id
          }

          ... on ZeroExOrder {
            id: salt
            expiration
            feeRecipient
            makerFee
            takerFee
            salt
            signature {
              v
              r
              s
            }
            maker
            taker
          }

          price
          buy {
            howMuch
            symbol
          }
          sell {
            howMuch
            symbol
          }
          type
          exchange
          exchangeContractAddress
          isActive
        }
      }
    }
  }
`;

const mapDispatchToProps = dispatch => ({
  onClick: orders => {
    dispatch(actions.selectOrder(orders));
  },
});

const mapStateToProps = state => ({
  baseToken: state.app.assetPair.base,
  quoteToken: state.app.assetPair.quote,
  isReadyToTrade: state.app.isReadyToTrade,
  network: state.ethereum.network,
  config: state.fund.config,
  decimals: 4,
  availableExchanges,
});

const withExchangeState = withState(
  'exchanges',
  'setExchange',
  availableExchanges.map(exchange => exchange.value),
);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSubscription = BaseComponent => baseProps => (
  <Subscription
    key={baseProps.exchanges.join(':')}
    subscription={subscription}
    variables={{
      // @TODO: Move "..." to the rendering part
      baseToken: baseProps.baseToken !== '...' && baseProps.baseToken,
      quoteToken: baseProps.quoteToken !== '...' && baseProps.quoteToken,
      network: baseProps.network === '42' ? 'KOVAN' : 'LIVE',
      exchanges: baseProps.exchanges.length > 0 && baseProps.exchanges,
    }}
  >
    {props => (
      <BaseComponent
        {...baseProps}
        orderbook={props.data && props.data.orderbook}
        loading={props.loading}
      />
    )}
  </Subscription>
);

export default compose(
  withConnect,
  withExchangeState,
  withSubscription,
)(Orderbook);
