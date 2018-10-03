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

const content = noHeader => ({
  margin: noHeader ? '10px 0' : '70px 0',
});

const Layout = ({ children, noHeader = false, ...props }) => (
  <Fragment>
    <style jsx>{`
      .header {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 1;
      }

      .footer {
        position: fixed;
        width: 100%;
        bottom: 0;
        z-index: 1;
      }

      .content {
        margin: ${noHeader ? '24px 16px' : '70px 16px'};

        @media (--viewport-s) {
          margin: ${noHeader ? '32px 7%' : '70px 7%'};
        }
      }
    `}</style>

    {!noHeader && (
      <div className="header">
        <Header
          network={props.network && displayNetwork(props.network)}
          message={props.message}
          address={props.account}
          balances={props.balances}
        />
      </div>
    )}

    <div className="content">
      <Content>{children}</Content>
    </div>

    <div className="footer">
      <Footer />
    </div>
  </Fragment>
);

export default Layout;
