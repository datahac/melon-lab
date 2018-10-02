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

const fixedTop = {
  position: 'fixed',
  width: '100%',
  top: 0,
  zIndex: 1,
};

const fixedBottom = {
  position: 'fixed',
  width: '100%',
  bottom: 0,
  zIndex: 1,
};

const Layout = ({ children, noHeader = false, ...props }) => (
  <Fragment>
    {!noHeader && (
      <div style={fixedTop}>
        <Header
          network={props.network && displayNetwork(props.network)}
          message={props.message}
          address={props.account}
          balances={props.balances}
        />
      </div>
    )}

    <Content>{children}</Content>

    <div style={fixedBottom}>
      <Footer />
    </div>
  </Fragment>
);

export default Layout;
