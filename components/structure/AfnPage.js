import React from 'react';
import { useLocation } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { LinkFromFields, LinkFromRecursive, FullPageFields, ContentFeedFields, PageContentFragment, AssetFields, TagFields, CarouselFields, SingleFilterListingFields, MultipleFilterListingFields, FilterFields, RecipeFields, ArticleFields, BrightcoveVideoFields } from '../../utils/fragments'
import { allLocales, defaultLanguage, defaultLocale} from '../../utils/siteConfig'
import { preview } from '../../config/apollo-client';
import ReactSEO from './ReactSEO';
import Breadcrumb from './Breadcrumb';
import RichText from './RichText';
import Loading from './Loading';
import Error from './Error';

const propTypes = {};
const defaultProps = {};

const isServer = typeof window === 'undefined';

const PageQuery = gql`
  query pageCollection($preview: Boolean!, $locale: String!, $slug: String!) {
    pageCollection(preview: $preview, limit: 1, locale: $locale, where: {slug: $slug}) {
      items {
        ...FullPageFields
      }
    }
  }
  ${AssetFields}
  ${TagFields}
  ${CarouselFields}
  ${ContentFeedFields}
  ${SingleFilterListingFields}
  ${FilterFields}
  ${RecipeFields}
  ${ArticleFields}
  ${MultipleFilterListingFields}
  ${PageContentFragment}
  ${LinkFromFields}
  ${LinkFromRecursive}
  ${FullPageFields}
  ${BrightcoveVideoFields}
`;

const AfnPage = () => {
    let { pathname } = useLocation();
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
    
    return <Query query={PageQuery} variables= {{ preview, locale, slug: pathname}}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return <Error />;
        if (!data || !data.pageCollection || !data.pageCollection.items || !data.pageCollection.items.length) {
          return <Error />;
        }
        let page = data.pageCollection.items[0];
        
        return <>
          <ReactSEO title={page.pageTitle} description={page.description} />
          <Breadcrumb page={page} language={language} />
          {(!page.rightPanel || !pathname) && <>
            <RichText pageContent={page.content} locale={locale} language={language} slug={page.slug} tags={page.tagsCollection.items} />
          </>}
          {!!page.rightPanel && !!pathname && <>
            <div className="container responsivegrid aem-GridColumn--offset--medium--0 aem-GridColumn--small--none aem-GridColumn--medium--none aem-GridColumn--default--none aem-GridColumn--medium--12 aem-GridColumn aem-GridColumn--small--12 aem-GridColumn--offset--small--0 aem-GridColumn--default--7 aem-GridColumn--offset--default--0">
              <div className="cmp-container">
                <RichText pageContent={page.content} locale={locale} language={language} slug={page.slug} tags={page.tagsCollection.items} />
              </div>
            </div>
            <div className="container responsivegrid aem-GridColumn--offset--medium--0 aem-GridColumn--small--none aem-GridColumn--default--none aem-GridColumn--medium--newline aem-GridColumn--medium--12 aem-GridColumn aem-GridColumn--small--12 aem-GridColumn--offset--small--0 aem-GridColumn--default--3 aem-GridColumn--offset--default--0">
              <div className="cmp-container">
                <RichText pageContent={page.rightPanel} locale={locale} language={language} slug={page.slug} tags={page.tagsCollection.items} />
                { !page.rightPanel && page.seoMetadataImage && <img src={page.seoMetadataImage.url} title={page.title} alt={page.title} />}
              </div>
            </div>
          </>}
        </>
      }}
    </Query>
}

AfnPage.propTypes = propTypes;
AfnPage.defaultProps = defaultProps;

export default AfnPage;