import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { AccountProvider } from '+/components/AccountContext';
import { ConfigurationProvider } from '+/components/ConfigurationContext';
import { BalanceProvider } from '+/components/BalanceContext';
import { FundManagerProvider } from '+/components/FundManagerContext';
import { NetworkProvider } from '+/components/NetworkContext';
import { CapabilityProvider } from '+/components/CapabilityContext';
import React from 'react';
import withApollo from '~/apollo';

import '~/static/images/logos.svg';
import '~/static/images/icons.svg';

if (!!process.browser) {
  console.log(
    '%c👋🤓',
    'background: rgba(0,0,0,.87); color: #fffdf3; font-size: 30px',
  );

  console.log(
    '%cHello nerd. Checking out the internals of our frontend? We like that! If you want to work with us, send us a message: team@melonport.com.',
    'background: rgba(0,0,0,.87); color: #fffdf3; font-size: 12px',
  );

  window.eval = global.eval = () => {
    throw new Error(`Sorry, this app does not support window.eval().`);
  };

  if (process.env.NODE_ENV !== 'development') {
    window.onbeforeunload = () =>
      'Your session will be terminated. Did you save your mnemonic and/or JSON wallet?';
  }
}

class MelonApp extends App {
  public render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <ConfigurationProvider>
            <NetworkProvider>
              <AccountProvider>
                <FundManagerProvider>
                  <BalanceProvider>
                    <CapabilityProvider>
                      <Component {...pageProps} />
                    </CapabilityProvider>
                  </BalanceProvider>
                </FundManagerProvider>
              </AccountProvider>
            </NetworkProvider>
          </ConfigurationProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MelonApp);
