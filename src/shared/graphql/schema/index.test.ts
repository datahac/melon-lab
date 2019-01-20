import {
  deposit,
  getFundDetails,
  getTokenBySymbol,
  randomString,
  sendEth,
  withPrivateKeySigner,
} from '@melonproject/protocol';
import * as Tm from '@melonproject/token-math';
import { execute } from 'graphql/execution';
import * as R from 'ramda';
import Accounts from 'web3-eth-accounts';

import { schema } from '~/shared/graphql/schema';
import { createContext } from '~/shared/graphql/schema/context';
import { getEnvironment, getWallet } from '~/shared/graphql/schema/environment';

import {
  estimateFundSetupBeginMutation,
  estimateFundSetupCompleteMutation,
  estimateFundSetupStepMutation,
  executeFundSetupBeginMutation,
  executeFundSetupCompleteMutation,
  executeFundSetupStepMutation,
} from './queries/fundSetup.gql';

import * as rankings from './queries/rankings.gql';

jest.setTimeout(240000);

describe('graphql schema', () => {
  let environment;
  let context;
  let fundAddress;
  const fundName = `test-fund-${randomString()}`;

  beforeAll(async () => {
    environment = await getEnvironment();
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

  it('Ranking', async () => {
    const result = await execute(schema, rankings, null, context());
    expect(result.errors).toBeUndefined();
    expect(result.data).toBeTruthy();
  });

  it('Setup fund', async () => {
    const fundsBefore = await getFundDetails(environment);

    const estimateSetupBegin = await execute(
      schema,
      estimateFundSetupBeginMutation,
      null,
      context(),
      {
        name: fundName,
        exchanges: ['KYBER_NETWORK'],
        managementFee: 2,
        performanceFee: 20,
      },
    );

    expect(estimateSetupBegin.errors).toBeUndefined();
    expect(estimateSetupBegin.data).toBeTruthy();

    const executeSetupBegin = await execute(
      schema,
      executeFundSetupBeginMutation,
      null,
      context(),
      estimateSetupBegin.data && estimateSetupBegin.data.estimate,
    );

    expect(executeSetupBegin.errors).toBeUndefined();
    expect(executeSetupBegin.data).toBeTruthy();

    fundAddress = R.path(['data', 'execute'], executeSetupBegin);

    const steps = [
      'CREATE_ACCOUNTING',
      'CREATE_FEE_MANAGER',
      'CREATE_PARTICIPATION',
      'CREATE_POLICY_MANAGER',
      'CREATE_SHARES',
      'CREATE_TRADING',
      'CREATE_VAULT',
    ];

    for (const step of steps) {
      const estimateStep = await execute(
        schema,
        estimateFundSetupStepMutation,
        null,
        context(),
        {
          step,
        },
      );

      expect(estimateStep.errors).toBeUndefined();
      expect(estimateStep.data).toBeTruthy();

      const executeStep = await execute(
        schema,
        executeFundSetupStepMutation,
        null,
        context(),
        {
          step,
          ...(estimateStep.data && estimateStep.data.estimate),
        },
      );

      expect(executeStep.errors).toBeUndefined();
      expect(executeStep.data).toBeTruthy();
    }

    const estimateFundSetupComplete = await execute(
      schema,
      estimateFundSetupCompleteMutation,
      null,
      context(),
    );

    const executeFundSetupComplete = await execute(
      schema,
      executeFundSetupCompleteMutation,
      null,
      context(),
      R.path(['data', 'estimate'], estimateFundSetupComplete),
    );

    const fundsAfter = await getFundDetails(environment);

    expect(R.path(['data', 'execute'], executeSetupBegin)).toBe(
      R.path(['data', 'execute'], executeFundSetupComplete),
    );

    expect(fundsAfter.length).toBeGreaterThan(fundsBefore.length);

    const fundFromRanking = fundsAfter.find(
      fund => fund.address === fundAddress,
    );

    expect(fundFromRanking).toBeTruthy();
    expect(fundFromRanking.name).toBe(fundName);
  });
});
