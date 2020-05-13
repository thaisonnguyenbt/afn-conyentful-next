import React from 'react';
import { Route, Switch } from "react-router-dom";
import NotFound from './Error'
import Layout from './Layout';
import AfnPage from './AfnPage';

const Page = () => <Layout>
    <Switch>
        <Route path="/">
            <AfnPage />
        </Route>
        <Route component={Error} />
    </Switch>
</Layout>

export default Page
