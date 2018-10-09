import { storiesOf } from '@storybook/react';
import React from 'react';
import Layouts from './index';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Title from '~/blocks/Title/index';

storiesOf('Design|Layouts', module).add('Default', () => (
  <Layouts
    Header={Header}
    HeaderProps={{
      network: '',
      message: '',
      address: '',
      balances: {
        eth: '',
        mln: '',
      },
    }}
    Footer={Footer}
    FooterProps
    Title={Title}
    TitleProps={{
      title: 'sdfsdf',
      icon: 'icons_wallet',
      text: 'Hello World'
    }}
  />
));
