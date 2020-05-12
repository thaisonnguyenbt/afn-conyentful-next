import React from 'react';
import {BrowserRouter} from 'react-router-dom';
const isServer = typeof window === 'undefined';
import { ApolloProvider } from "react-apollo";  
import { client } from '../config/apollo-client'

export default App => {
  return class AppWithReactRouter extends React.Component {
    static async getInitialProps(appContext) {
      if (!appContext.ctx.req) {
        appContext.ctx.req = { originalUrl : '/' }
      }
      const {
        ctx: {
          req: {
            originalUrl,
            locals = {},
          },
        },
      } = appContext;
      return {
        originalUrl,
        context: locals.context || {},
      };
    }

    render() {
      if (isServer) {
        const {StaticRouter} = require('react-router');
        return (
          <StaticRouter
            location={this.props.originalUrl}
            context={this.props.context}
          >
            <App {...this.props} />
          </StaticRouter>
        );
      }
      
      return (
        <ApolloProvider client={client}>
          <BrowserRouter>
            <App {...this.props} />
          </BrowserRouter>
        </ApolloProvider>
      );
    }
  };
};
