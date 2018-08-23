import { storiesOf } from '@storybook/react';
import React from 'react';
import ContributionForm from './container';

const data = {
  initialValues: {
    amount: '',
    total: '',
  },
  dataValid: true,
  melonAssetSymbol: 'MLN',
};

storiesOf('Components|Contribution Form', module).add('Default', () => {
  return <ContributionForm {...data} />;
});
