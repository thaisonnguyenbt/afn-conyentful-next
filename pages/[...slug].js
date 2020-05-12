import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PageList from '../components/PagesList';
import { Route, Link, Switch } from "react-router-dom";
import { Redirect } from 'react-router'
import Home from './Home'
import About from './About'
import Users from './Users'
import ReactDOM from 'react-dom'
import NotFound from './NotFound'
import Layout from '../components/structure/Layout';
import AfnPage from '../components/structure/AfnPage';

const AnyPage = () => {
    return <>
      
      <Layout>
        <div>
            <div>
                { process.browser && <Switch>
                  <Route path="/">
                    <AfnPage />
                  </Route>
                  <Route component={NotFound} />
                </Switch>}
            </div>
        </div>
      </Layout>
    </>
}

export default AnyPage
