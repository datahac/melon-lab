import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import React from 'react';
import ReactModal from 'react-modal';
import withApollo from '../wrappers/withApollo';

if (typeof window !== 'undefined') {
  window.eval = global.eval = () => {
    throw new Error('Sorry, this app does not support window.eval().');
  };

  ReactModal.setAppElement('#__next');
}

class MelonApp extends App {
  public render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MelonApp);
