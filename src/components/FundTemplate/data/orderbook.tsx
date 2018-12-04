import { Subscription } from '~/apollo';
import gql from 'graphql-tag';

const subscription = gql`
  subscription OrderBookQuery(
    $base: String!
    $quote: String!
    $exchanges: [ExchangeEnum]
  ) {
    orderbook(base: $base, quote: $quote, exchanges: $exchanges) {
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

const OrderBookQuery = ({ exchanges, baseAsset, quoteAsset, children }) => (
  <Subscription
    key={exchanges.join(':')}
    subscription={subscription}
    variables={{
      base: baseAsset,
      quote: quoteAsset,
      exchanges: exchanges.length > 0 && exchanges,
    }}
    ssr={false}
  >
    {children}
  </Subscription>
);

export default OrderBookQuery;
