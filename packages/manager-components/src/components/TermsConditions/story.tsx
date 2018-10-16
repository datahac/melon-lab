import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import TermsConditions from './index';

const data = {
  sign: action('sign'),
};

storiesOf('Components|Terms And Conditions', module)
  .add('Default', () => {
    return <TermsConditions {...data} />;
  })
  .add('Network 1', () => {
    return <TermsConditions {...data} networkId="1" />;
  });
