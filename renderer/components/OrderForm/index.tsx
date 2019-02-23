import React, { Fragment, useState } from 'react';
import * as Rx from 'rxjs';
import * as R from 'ramda';
import * as Tm from '@melonproject/token-math';
import { useObservable } from 'rxjs-hooks';
import Composer from 'react-composer';
import OrderForm from '~/components/OrderForm';
import { NetworkConsumer } from '+/components/NetworkContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import MakeOrder from '+/components/MakeOrder';
import TakeOrder from '+/components/TakeOrder';
import withForm from './withForm';
import EngineQuery from './data/engine';
import isSameAddress from '~/shared/utils/isSameAddress';
import {
  debounceTime,
  switchMap,
  filter,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { withApollo } from 'react-apollo';
import { KyberPriceQuery } from '~/queries/KyberPrice.gql';

const WrappedOrderForm = withApollo(
  withForm(props => {
    useObservable(
      inputs$ => {
        const kyber$ = inputs$.pipe(
          filter(([exchange]) => exchange === 'KYBER_NETWORK'),
          debounceTime(250),
          switchMap(async ([_, quantity]) => {
            const result = await props.client.query({
              query: KyberPriceQuery,
              variables: {
                quantity:
                  (quantity && quantity.quantity.toString()) ||
                  '1000000000000000000',
                symbol: props.baseToken.token.symbol,
                type: props.values.type && props.values.type.toUpperCase(),
              },
            });

            return result.data && result.data.kyberPrice;
          }),
          withLatestFrom(inputs$),
          tap(([price, [exchange, quantity]]) => {
            if (exchange === 'KYBER_NETWORK') {
              props.setFieldValue('price', price);

              if (quantity) {
                const total = Tm.valueIn(price, quantity);
                props.setFieldValue('total', total);
              }
            }
          }),
        );

        const melon$ = inputs$.pipe(
          filter(([exchange]) => exchange === 'MELON_ENGINE'),
          tap(([, , enginePrice]) => {
            props.setFieldValue('price', enginePrice);
            props.setFieldValue('type', 'Sell');
          }),
        );

        return Rx.merge(kyber$, melon$);
      },
      props.initialValues.price,
      [props.values.exchange, props.values.quantity, props.enginePrice],
    );

    const limitExchanges = props.exchanges
      .filter(
        ([value]) => !R.includes(value, ['KYBER_NETWORK', 'MELON_ENGINE']),
      )
      .map(([value, name]) => ({
        value,
        name,
      }));

    const marketExchanges = props.exchanges
      .filter(([value]) => value !== 'ETHFINEX')
      .map(([value, name]) => ({
        value,
        name,
      }));

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
        />
        <OrderForm
          {...props}
          setOrderFormValues={props.setOrderFormValues}
          limitExchanges={limitExchanges}
          marketExchanges={marketExchanges}
        />
      </Fragment>
    );
  }),
);

const OrderFormContainer: React.PureComponent<{}, {}> = props => {
  const [submittedValues, setSubmittedValues] = useState(null);

  const getTokenBalance = asset => {
    const balance = R.compose(
      R.propOr(0, 'balance'),
      R.find(holding => holding.balance.token.symbol === asset),
    )(props.holdings);

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

  return (
    <Composer
      components={[
        <NetworkConsumer />,
        <FundManagerConsumer />,
        <EngineQuery />,
      ]}
    >
      {([network, managerProps, engine]) => {
        const isManager =
          !!managerProps.fund &&
          isSameAddress(managerProps.fund, props.address);

        return (
          <WrappedOrderForm
            baseToken={getTokenBalance(props.baseAsset)}
            quoteToken={getTokenBalance(props.quoteAsset)}
            isCompetition={false}
            isManager={isManager}
            holdings={props.holdings}
            formValues={props.formValues}
            enginePrice={R.path(['data', 'enginePrice'], engine)}
            liquidEther={R.path(['data', 'liquidEther'], engine)}
            priceFeedUp={network && network.priceFeedUp}
            orderFormValues={submittedValues}
            setOrderFormValues={setSubmittedValues}
            bid={props.bid}
            ask={props.ask}
            exchanges={props.exchanges}
          />
        );
      }}
    </Composer>
  );
};

export default OrderFormContainer;
