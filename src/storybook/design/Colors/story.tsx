import { storiesOf } from '@storybook/react';
import React from 'react';
import { MainColors, OtherColors, StatusColors } from './index';

const stories = storiesOf('Design|Colors', module);

stories.add('Main Colors', () => <MainColors />);
stories.add('Status Colors', () => <StatusColors />);
stories.add('Other Colors', () => <OtherColors />);
