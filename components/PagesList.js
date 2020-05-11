import React from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const PageQuery = gql`
  query pageCollection {
    pageCollection(limit: 100) {
      items {
        slug
        title
      }
    }
  }
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
          return <li key={`page__${page.title}`}>{page.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default PageList;
