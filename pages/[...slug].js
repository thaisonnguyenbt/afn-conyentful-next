import React from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PageList from '../components/PagesList';
import Header from '../components/Header';
import { Route, Link, Switch } from "react-router-dom";
import { Redirect } from 'react-router'
import Home from './Home'
import About from './About'
import Users from './Users'
import NotFound from './NotFound'

const AnyPage = () => {
    return (
        <div>
            <div>
                <h1>Welcome to Next.js!</h1>
                <nav>
                <ul>
                    <li>
                    <Link to="/">Home</Link>
                    </li>
                    <li>
                    <Link to="/about/">About</Link>
                    </li>
                    <li>
                    <Link to="/users/">Users</Link>
                    </li>
                    <li>
                    <Link to="/people/">People</Link>
                    </li>
                </ul>
                </nav>

                <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about/" component={About} />
                <Route path="/users/" component={Users} />
                <Redirect from="/people/" to="/users/" />
                <Route component={NotFound}/>
                </Switch>
            </div>
            <PageList />
            </div>
    )
}

export default AnyPage
