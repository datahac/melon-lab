import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Setup from './container';

const data = {
  initialValues: {
    name: '',
  },
  config: {
    canonicalPriceFeedAddress: 'foo',
    competitionComplianceAddress: 'bar',
    onlyManagerCompetitionAddress: 'foo',
  },
  onSubmit: action('onSubmit'),
};

storiesOf('Components|Setup', module).add('Default', () => {
  return <Setup {...data} />;
});
