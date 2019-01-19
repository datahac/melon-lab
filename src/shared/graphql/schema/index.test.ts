import {
  deposit,
  getTokenBySymbol,
  sendEth,
  withPrivateKeySigner,
} from '@melonproject/protocol';
import * as Tm from '@melonproject/token-math';
import gql from 'graphql-tag';
import { execute } from 'graphql/execution';
import Accounts from 'web3-eth-accounts';

import { schema } from '~/shared/graphql/schema';
import { createContext } from '~/shared/graphql/schema/context';
import { getEnvironment, getWallet } from '~/shared/graphql/schema/environment';

import { estimateFundSetupBeginMutation } from './queries/estimateFundSetupBeginMutation.gql';

jest.setTimeout(240000);

describe('graphql schema', () => {
  let context;

  beforeAll(async () => {
    const environment = await getEnvironment();
    const wallet = await getWallet();
    const accounts = new Accounts(environment.eth.currentProvider);
    const account = accounts.create();
    const master = await withPrivateKeySigner(environment, wallet.privateKey);
    const tester = await withPrivateKeySigner(environment, account.privateKey);

    await sendEth(master, {
      howMuch: Tm.createQuantity('ETH', 100),
      to: tester.wallet.address,
    });

    const weth = getTokenBySymbol(environment, 'WETH');
    const quantity = Tm.createQuantity(weth, 10);

    await deposit(tester, quantity.token.address, undefined, {
      value: quantity.quantity.toString(),
    });

    context = await createContext(tester, account);
  });

  it('returns the ranking', async () => {
    const query = gql`
      query {
        rankings {
          id
        }
      }
    `;

    const result = await execute(schema, query, null, context());
    expect(result.data).toBeTruthy();
  });

  it('Setup fund', async () => {
    const result = await execute(
      schema,
      estimateFundSetupBeginMutation,
      null,
      context(),
      {
        name: 'Test Fund',
        exchanges: ['KYBER_NETWORK'],
        managementFee: 2,
        performanceFee: 20,
      },
    );

    console.log(JSON.stringify(result, null, 2));
  });
});
