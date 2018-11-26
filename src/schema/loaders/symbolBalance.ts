import * as R from 'ramda';
import * as Rx from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as protocol from '@melonproject/protocol';
import * as tokenMath from '@melonproject/token-math';

export const extractQuantity = quantity => {
  return quantity && quantity.quantity.toString();
};

export const getEthBalance = async (environment, address) => {
  const balance = await environment.eth.getBalance(address);
  const quantity = tokenMath.quantity.createQuantity('ETH', balance.toString());
  return quantity;
};

export const getTokenBalance = async (
  environment,
  deployment,
  symbol,
  address,
) => {
  const token = deployment.tokens.find(item => item.symbol === symbol);
  const quantity = await protocol.token.balanceOf(
    token.address,
    { address },
    environment,
  );
  return quantity;
};

export const getSymbolBalance = R.curryN(
  3,
  async (environment, deployment, symbol, address) => {
    const quantity =
      symbol === 'ETH'
        ? await getEthBalance(environment, address)
        : await getTokenBalance(environment, deployment, symbol, address);

    return {
      quantity: extractQuantity(quantity),
      token: {
        decimals: quantity.token.decimals,
        symbol: quantity.token.symbol,
        address: quantity.token.address,
      },
    };
  },
);

export const observeSymbolBalance = R.curryN(
  3,
  (environment, streams, symbol, address) => {
    if (symbol === 'ETH') {
      const stream$ = streams.block$.pipe(
        switchMap(() => {
          return getEthBalance(environment, address);
        }),
      );

      return stream$.pipe(
        map(quantity => ({
          quantity: extractQuantity(quantity),
          token: {
            decimals: quantity.token.decimals,
            symbol: quantity.token.symbol,
            address: quantity.token.address,
          },
        })),
      );
    }

    const stream$ = streams.deployment$.pipe(
      switchMap(deployment => {
        const token = deployment.tokens.find(item => item.symbol === symbol);
        const zen = protocol.token.balanceOf.observable(
          token.address,
          { address },
          environment,
        );
        return Rx.from(zen);
      }),
    );

    return stream$.pipe(
      map(quantity => ({
        quantity: extractQuantity(quantity),
        token: {
          decimals: quantity.token.decimals,
          symbol: quantity.token.symbol,
          address: quantity.token.address,
        },
      })),
    );
  },
);
