import React from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PageList from '../components/PagesList';
import Header from '../components/Header';
import Link from 'next/link'

const Home = () => {
  
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Link href="page2">
        <a>Page 2</a>
      </Link>
      <PageList />
    </div>
  );
};

export default Home;
