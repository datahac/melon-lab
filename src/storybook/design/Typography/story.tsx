import { storiesOf } from '@storybook/react';
import React from 'react';
import { FontFamilies, FontSizes, FontWeights } from './index';

const stories = storiesOf('Design|Typography', module);

stories.add('Families', () => <FontFamilies />);
stories.add('Weights', () => <FontWeights />);
stories.add('Sizes', () => <FontSizes />);
