import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { AccountProvider } from '+/components/AccountContext';
import { ConfigurationProvider } from '+/components/ConfigurationContext';
import { BalanceProvider } from '+/components/BalanceContext';
import { FundManagerProvider } from '+/components/FundManagerContext';
import { NetworkProvider } from '+/components/NetworkContext';
import { CapabilityProvider } from '+/components/CapabilityContext';
import { SetupProvider } from '+/components/SetupContext';
import withApollo from '~/shared/graphql/withApollo';

if (!!process.browser) {
  global.eval = () => {
    throw new Error('Sorry, this app does not support window.eval().');
  };

  if (process.env.NODE_ENV !== 'development') {
    (global as any).onbeforeunload = () => {
      return 'Your session will be terminated. Did you save your mnemonic and/or JSON wallet?';
    };
  }
}

class MyApp extends App {
  public render() {
    const { Component } = this.props;

    return (
      <Container>
        <ApolloProvider client={this.props.apollo}>
          <ConfigurationProvider>
            <NetworkProvider>
              <AccountProvider>
                <FundManagerProvider>
                  <BalanceProvider>
                    <CapabilityProvider>
                      <SetupProvider>
                        <Component {...this.props.pageProps} />
                      </SetupProvider>
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

export default withApollo(MyApp);
