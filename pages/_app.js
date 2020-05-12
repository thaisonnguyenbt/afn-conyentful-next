import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';

import withData from '../config/apollo-client';
import withReactRouter from '../config/with-react-router';

import '../resources/scss/main.scss';
import '../resources/scss/vendor.scss';
import '../resources/scss/custom.scss';
class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </>
    );
  }
}

// Wraps all components in the tree with the data provider
export default withData(withReactRouter(MyApp));
