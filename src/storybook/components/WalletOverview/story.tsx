import { storiesOf } from '@storybook/react';
import React from 'react';
import WalletOverview from './index';

const data = {
  associatedFund: 'My fund',
  associatedFundName: '0x0890b03f83629B397F6E5E5075400fe6Ddb4255F',
  currentAddress: '0x0890b03f83629B397F6E5E5075400fe6Ddb4255F',
  networkId: 'KOVAN',
  balances: {
    eth: '1',
    mln: '1',
    weth: '1',
  },
  loading: false,
};

storiesOf('Components|Wallet Overview', module).add('Default', () => {
  return (
    <WalletOverview
      {...data}
      currentAddress="0x270c65cb31d037E4269dC8F736350FDc8ED07353"
    />
  );
});
