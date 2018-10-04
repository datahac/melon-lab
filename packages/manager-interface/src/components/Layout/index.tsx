import React, { Fragment } from 'react';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Content from '~/design/Layout';
import { networks } from '@melonproject/melon.js';

const displayNetwork = network => {
  const key = Object.values(networks).indexOf(network);
  const values = Object.keys(networks);
  return values[key] && values[key].toLocaleLowerCase();
};

const Layout = ({ children, noHeader = false, ...props }) => (
  <Content
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
    Footer={Footer}
    FooterProps
  >
    {children}
  </Content>
);

export default Layout;
