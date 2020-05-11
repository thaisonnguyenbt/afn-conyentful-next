import React, {Component} from 'react'
import PropTypes from 'prop-types'
import HeaderDesktop from './HeaderDesktop'
import HeaderDesktopNavBar from './HeaderDesktopNavBar'
import HeaderMobile from './HeaderMobile'
import HeaderMobileNavBar from './HeaderMobileNavBar'
import { preview } from '../../../config/apollo-client';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import {PageNavigationFields} from '../../../utils/fragments'
import siteMetadata from '../../../config/SiteMetaData'
import { allLanguages, allLocales, defaultLocale , defaultLanguage} from '../../../config/siteConfig'

//import './Header.scss'

const NavigationQuery = gql`
    query pageCollection($preview: Boolean!, $locale: String!) {
        pageCollection(preview: $preview, locale: $locale, limit: 1, where: {
            isRoot: true
        }) {
            items {
                ...PageNavigationFields
                childrenCollection (limit: 20) {
                    items {
                        ...PageNavigationFields
                        childrenCollection (limit: 10) {
                            items {
                                ...PageNavigationFields
                            }
                        }
                    }
                }
            }
        }
    }
    ${PageNavigationFields}
`;

/**
 * AFN Header component
 * 
 * @param {*} siteMetadata 
 *      Metadata read from gatsby-config.js
 */
const Header = () => {

    let pathname = '/en/articles';
    let language = '';
    let locale = '';
    language = defaultLanguage;
    locale = defaultLocale;
    //pathname = window.location.pathname;
    if (pathname.length > 2) {
        language = pathname.substr(1,2);
        pathname = pathname.substr(3);
    }
    allLocales.forEach((localeStr) => {
        if (localeStr.startsWith(language)) {
            locale = localeStr;
        }
    })



    function checkLocale(event) {

        let element = event.target;
        if (element.nodeName !== 'A')
            element = element.parentElement;

        let language = defaultLanguage;
        let locale = defaultLocale;
        let pathname = element.getAttribute("href");
        if (pathname.length > 2) {
            language = pathname.substr(1,2);
            pathname = pathname.substr(3);
        }
        allLocales.forEach((localeStr) => {
            if (localeStr.startsWith(language)) {
                locale = localeStr;
            }
        })

        if (locale !== locale || language !== language) {
            this.setState(({
                locale,
                language
            }))
        }
    }
        
    return <div className={"experiencefragment aem-GridColumn aem-GridColumn--default--12"}>
        <div className={"xf-content-height"}>
            <div className={"aem-Grid aem-Grid--12 aem-Grid--default--12"}>
                {<Query query={NavigationQuery} variables={{ preview: false, locale: locale}}>
                    {({ loading, error, data }) => {
                        if (loading) return <></>;
                        if (error) return <></>;
                        const rootNode = data.pageCollection.items[0];
                        const pages = rootNode.childrenCollection.items;
                        return <>
                            <header className="o-header">
                                <nav className="o-navbar -desktop">
                                    {/* <HeaderDesktop siteMetadata={siteMetadata} allLanguages={allLanguages} language={language} pathname={pathname} clickCallback={this.checkLocale} /> */}
                                    {/* <HeaderDesktopNavBar pages={pages} language={language} /> */}
                                </nav>
                                {/* <HeaderMobile siteMetadata={siteMetadata} /> */}
                            </header>
                            <div className="padded-header"></div>
                            <div className="o-search-container">
                                <div className="o-search__expanded">
                                    <div className="m-main-search-bar">
                                        <div className="m-search__suggestionsMenu tt-empty"></div>
                                        <form className="m-search-form" autoComplete="off" action="">
                                            <div data-search="autoComplete" data-enginekey="vmeRn9nsnWvxpy2yrxtp" data-resultsurl="https://asianfoodnetwork.com/en/search.html" data-noresults="Please try with a different search term ">
                                                <input className="typeahead" autoComplete="off" type="search" name="Search" title="Search" id="navbar-search" placeholder="Find recipes, articles and more"/>
                                            </div>
                                            <button type="submit" className="button m-search__submit" button-click="search-input">
                                            <span className="icon-afn-search"></span>
                                            </button>
                                        </form>
                                        <button className="button m-search__clear" button-click="clear-input">
                                            <svg width="34" height="34" viewBox="0 0 32 32" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                                                <rect height="5" rx="1.5" transform="translate(14.000000, 14.500000) rotate(-45.000000) translate(-14.000000, -14.500000) " width="34" x="-3" y="12"></rect>
                                                <rect height="5" rx="1.5" transform="translate(14.000000, 14.500000) rotate(-135.000000) translate(-14.000000, -14.500000) " width="34" x="-3" y="12"></rect>
                                            </svg>
                                        </button>
                                    </div>
                                    <button className="a-collapse-search" button-click="collapse-search">
                                    <span>Cancel</span>
                                    </button>
                                </div>
                            </div>
                            {/* <HeaderMobileNavBar siteMetadata={siteMetadata} pages={pages} language={language} /> */}
                        </>

                    }}
                </Query> }
            </div>
        </div>
    </div>
}

/**
 * Define the structure for Header component's properties
 */
Header.propTypes = {
    siteMetadata : PropTypes.shape({
        title: PropTypes.string,
        description : PropTypes.string,
        facebook: PropTypes.string,
        pinterest : PropTypes.string,
        instagram: PropTypes.string
    }).isRequired,
}

/**
 * Define default value for Header component properties
 */
Header.defaultProps = {
    siteMetadata : {
        title: '',
        description : '',
        facebook: '',
        pinterest : '',
        instagram: ''
    }
}

export default Header