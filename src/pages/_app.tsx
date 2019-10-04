import React from 'react';
import withApollo from 'next-with-apollo';
import App, { Container } from 'next/app';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { onError } from 'apollo-link-error';
import { AccountProvider } from '+/components/AccountContext';
import { ConfigurationProvider } from '+/components/ConfigurationContext';
import { BalanceProvider } from '+/components/BalanceContext';
import { FundManagerProvider } from '+/components/FundManagerContext';
import { NetworkProvider } from '+/components/NetworkContext';
import { CapabilityProvider } from '+/components/CapabilityContext';
import { SetupProvider } from '+/components/SetupContext';
import SettingsProvider from '+/components/SettingsContext';
import { createSchemaLink } from '~/gql';
import { schema } from '~/gql/schema';
import { createContext } from '~/gql/context';
import { createEnvironment } from '~/gql/environment';
import ProviderEngine from 'web3-provider-engine';
import CacheSubprovider from 'web3-provider-engine/subproviders/cache.js';
import RpcSubprovider from 'web3-provider-engine/subproviders/rpc.js';

if (!!process.browser) {
  global.eval = () => {
    throw new Error('Sorry, this app does not support window.eval().');
  };
}

const createErrorLink = () => {
  return onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        const fields = path && path.join('.');

        console.error('[GQL ERROR]: Message: %s, Path: %s, Locations: %o', message, fields, locations);

        const stacktrace = extensions && extensions.exception && extensions.exception.stacktrace;
        if (stacktrace && stacktrace.length) {
          stacktrace.forEach(line => {
            console.error(line);
          });
        }
      });
    }

    if (networkError) {
      console.error('[GQL NETWORK ERROR]: %o', networkError);
    }
  });
};

const withApolloFinal = withApollo(() => {
  const link = (() => {
    if (typeof window === 'undefined') {
      return new ApolloLink(() => null);
    }

    const provider = (() => {
      const ethereum = (global as any).ethereum;
      if (ethereum) {
        ethereum.enable();
        return ethereum;
      }
    })();

    const context = createContext(createEnvironment(provider));
    const dataLink = createSchemaLink({ schema, context });
    const errorLink = createErrorLink();
    return ApolloLink.from([errorLink, dataLink]);
  })();

  const cache = new InMemoryCache({
    addTypename: true,
    // fragmentMatcher: new IntrospectionFragmentMatcher({
    //   introspectionQueryResultData: introspection,
    // }),
  });

  const client = new ApolloClient({
    link,
    cache,
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
        fetchPolicy: 'network-only',
      },
      query: {
        errorPolicy: 'all',
        fetchPolicy: 'network-only',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  });

  return client;
});

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
                        <SettingsProvider>
                          <Component {...this.props.pageProps} />
                        </SettingsProvider>
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

export default withApolloFinal(MyApp);
