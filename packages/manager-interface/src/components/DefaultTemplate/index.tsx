import React from 'react';
import Header from '~/components/Header';
import Headline from '~/blocks/Headline';
import Template from '~/templates/DefaultTemplate';
import { networks } from '@melonproject/melon.js';

const displayNetwork = network => {
  const key = Object.values(networks).indexOf(network);
  const values = Object.keys(networks);
  return values[key] && values[key].toLocaleLowerCase();
};

const DefaultLayout = ({ children, ...props }) => (
  <Template
    Header={Header}
    HeaderProps={{
      network: props.network && displayNetwork(props.network),
      message: props.message,
      address: props.account,
      balances: {
        eth: props.eth,
        mln: props.mln,
      },
    }}
    Headline={Headline}
    HeadlineProps={
      props.title && {
        title: props.title,
        text: props.text,
        icon: props.icon,
      }
    }
  >
    {children}
  </Template>
);

export default DefaultLayout;
