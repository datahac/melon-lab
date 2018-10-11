import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Wallet from './index';

const data = {
  associatedFund: '0x0890b03f83629B397F6E5E5075400fe6Ddb4255F',
  networkId: 'KOVAN',
  isCompetition: false,
  deleteWallet: action('deleteWallet'),
};

storiesOf('Components|Wallet', module)
  .add('Default', () => {
    return (
      <Wallet
        {...data}
        currentAddress="0x270c65cb31d037E4269dC8F736350FDc8ED07353"
      />
    );
  })
  .add('No Data', () => {
    return <Wallet {...data} />;
  });
