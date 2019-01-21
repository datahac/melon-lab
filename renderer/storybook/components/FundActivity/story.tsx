import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import FundActivity from './index';

const data = {
  requestFullParticipationHistory: action('requestFullParticipationHistory'),
};

storiesOf('Components|Fund Activity', module).add('Default', () => {
  return <FundActivity {...data} />;
});
