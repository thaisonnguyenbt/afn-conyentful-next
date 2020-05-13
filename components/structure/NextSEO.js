import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import { allLocales, defaultLanguage, defaultLocale} from '../../utils/siteConfig'

const SeoQuery = gql`
    query pageCollection($preview: Boolean!, $locale: String!, $slug: String!) {
        pageCollection(preview: $preview, limit: 1, locale: $locale, where: {slug: $slug}) {
                items {
                    title
                    description
                    pageTitle
                }
            }
        }
    `

const NextSEO = () => {
    let pathname = useRouter().asPath;
    let language = "";
    let locale = "";

    if (!!pathname && pathname.length > 2) {
      language = pathname.substr(1, 2);
      pathname = pathname.substring(3, pathname.length);
      allLocales.forEach(localeIt => {
        if (localeIt.startsWith(language)) {
          locale = localeIt;
        }
      })
    } else {
        pathname = "";
        language = defaultLanguage;
        locale = defaultLocale;
    }

    return <Query query={SeoQuery} variables= {{ preview: false, locale, slug: pathname}}>
        {({ loading, error, data }) => {
            if (loading) return <></>;
            if (error) return <></>;
            if (!data || !data.pageCollection || !data.pageCollection.items || !data.pageCollection.items.length) {
                return <></>;
            }
            let page = data.pageCollection.items[0];
            let pagetitle = page.pageTitle ? page.pageTitle : page.title;
            
            return <Head>
        
                {/* Schema.org for Google */}
                <meta itemProp="name" content={pagetitle} />
                <meta itemProp="description" content={page.description} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={pagetitle} />
                <meta name="twitter:description" content={page.description} />

                {/* Open Graph general (Facebook, Pinterest & Google+) */}
                <meta name="og:title" content={pagetitle} />
                <meta name="og:description" content={page.description} />
                <meta name="og:image" content={ pathname } />
                <meta name="og:url" content={ pathname } />

                <meta name="og:site_name" content={pagetitle} />
                <meta name="og:locale" content={locale} />
                <meta name="og:type" content="website" />
                {/* OG Tags Placeholder END */}
                <link rel="canonical" href={ pathname } />
            </Head>
        }}
    </Query>
}

export default NextSEO
