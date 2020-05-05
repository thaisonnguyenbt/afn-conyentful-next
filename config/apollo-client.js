import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import withApollo from 'next-with-apollo';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';

let contentfulConfig = null;
if (true) {//process.env.NODE_ENV === `development`) {
  contentfulConfig = require(`./.contentful`)
} else {
  contentfulConfig = {
    spaceId: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
    branch : process.env.REACT_APP_CONTENTFUL_BRANCH,
    isPreview: process.env.REACT_APP_CONTENTFUL_IS_PREVIEW === "true",
    deliveryToken: process.env.REACT_APP_CONTENTFUL_DELIVERY_TOKEN,
    previewToten: process.env.REACT_APP_CONTENTFUL_PREVIEW_TOKEN
  }
}

const link = createHttpLink({
  fetch, // Switches between unfetch & node-fetch for client & server.
  uri: `https://graphql.contentful.com/content/v1/spaces/${contentfulConfig.spaceId}/environments/${contentfulConfig.branch}`,
  headers : {
    "content-type": "application/json",
    authorization: `Bearer ${contentfulConfig.deliveryToken}`
  }
});

// Export a HOC from next-with-apollo
// Docs: https://www.npmjs.com/package/next-with-apollo
export default withApollo(
  // You can get headers and ctx (context) from the callback params
  // e.g. ({ headers, ctx, initialState })
  ({ initialState }) =>
    new ApolloClient({
      link: link,
      ssrMode: true,
      cache: new InMemoryCache()
        //  rehydrate the cache using the initial data passed from the server:
        .restore(initialState || {})
    })
);
