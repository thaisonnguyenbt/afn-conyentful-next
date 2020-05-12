import React from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { LinkFromFields, LinkFromRecursive, FullPageFields, ContentFeedFields, PageContentFragment, AssetFields, TagFields, CarouselFields, SingleFilterListingFields, MultipleFilterListingFields, FilterFields, RecipeFields, ArticleFields, BrightcoveVideoFields } from '../utils/fragments'


const PageQuery = gql`
  query pageCollection {
    pageCollection(limit: 100) {
      items {
        slug
        title
        tagsCollection {
          items {
            ...TagFields
          }
        }
      }
    }
  }
  ${TagFields}
`;


const PageList = () => {
    console.log("Render Page List")
  const { data, loading, error } = useQuery(PageQuery);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }
  return (
    <div>
      <ul>
        {data.pageCollection.items.map(page => {
          return <li key={`page__${page.title}`}>{page.tagsCollection.items.length}</li>;
        })}
      </ul>
    </div>
  );
};

export default PageList;
