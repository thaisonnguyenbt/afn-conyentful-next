const fetch = require('node-fetch');
const fs = require('fs');


let contentfulConfig = null;
if (true) {//process.env.NODE_ENV === `development`) {
  contentfulConfig = require(`./config/.contentful`)
} else {
  contentfulConfig = {
    spaceId: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
    branch : process.env.REACT_APP_CONTENTFUL_BRANCH,
    isPreview: process.env.REACT_APP_CONTENTFUL_IS_PREVIEW === "true",
    deliveryToken: process.env.REACT_APP_CONTENTFUL_DELIVERY_TOKEN,
    previewToken: process.env.REACT_APP_CONTENTFUL_PREVIEW_TOKEN
  }
}

const { spaceId, branch, isPreview, deliveryToken, previewToken} = contentfulConfig;


fetch(`https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${branch}`, {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        authorization: `Bearer ${deliveryToken}`
    },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then(result => result.json())
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      type => type.possibleTypes !== null,
    );
    result.data.__schema.types = filteredData;
    fs.writeFileSync('./fragmentTypes.json', JSON.stringify(result.data), err => {
      if (err) {
        console.error('Error writing fragmentTypes file', err);
      } else {
        console.log('Fragment types successfully extracted!');
      }
    });
  });