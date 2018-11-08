import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import CompetitionRegistration from './index';

const data = {
  skipRegistration: action('skipRegistration'),
  continueToSignCompetitionTerms: action('continueToSignCompetitionTerms'),
  sign: action('sign'),
  isRegistered: action('isRegistered'),
  fundAddress: 'foo',
  managerAddress: 'foo',
  r: 'foo',
  s: 'foo',
  v: 'foo',
};

storiesOf('Components|Competition Registration', module)
  .add('Default', () => {
    return <CompetitionRegistration {...data} showedRegistration={true} />;
  })
  .add('Registration', () => {
    return <CompetitionRegistration {...data} showedRegistration={false} />;
  })
  .add('Signature', () => {
    return (
      <CompetitionRegistration
        {...data}
        showedRegistration={true}
        competitionSignature={true}
      />
    );
  });
