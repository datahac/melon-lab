import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Account from './index';

const data = {
  associatedFund: '0x0890b03f83629B397F6E5E5075400fe6Ddb4255F',
  networkId: '42',
  isCompetition: false,
  deleteWallet: action('deleteWallet'),
};

storiesOf('Components|Account', module)
  .add('Default', () => {
    return (
      <Account
        {...data}
        currentAddress="0x270c65cb31d037E4269dC8F736350FDc8ED07353"
      />
    );
  })
  .add('No Data', () => {
    return <Account {...data} />;
  });
