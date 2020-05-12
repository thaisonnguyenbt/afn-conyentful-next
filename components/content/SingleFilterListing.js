import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import { BasicPageFields, TagFields, AssetFields } from '../../utils/fragments';
import LazyLoadPlaceHolder from '../structure/LazyLoadPlaceHolder';
import Loading from '../structure/Loading';
import Error from '../structure/Error';
import { preview } from '../../config/apollo-client';
import { gql } from '@apollo/client';
import { Query } from "react-apollo";


const propTypes = {};
const defaultProps = {};

const TagQuery = gql`
    query tagCollection($preview: Boolean!, $tag: String!, $offset: Int!, $pageSize: Int!) {
        tagCollection(preview: $preview, limit: 1, where: {tag: $tag}) {
            items {
                linkedFrom {
                    pageCollection(skip: $offset, limit: $pageSize) {
                        total
                        items {
                            slug
                        }
                    }
                }
            }
        }
    }
`;

/**
 * Query for pages from a given a array of slugs
 */
const FullSlugPageQuery = gql`
    query pageCollection($preview: Boolean!, $locale: String!, $pageSize: Int!, $slugs: [String!]) {
        pageCollection(preview: $preview, locale: $locale, limit: $pageSize, where: {slug_in: $slugs}, order: sys_publishedAt_DESC) {
            items {
                ...BasicPageFields
            }
        }
    }
    ${AssetFields}
    ${TagFields}
    ${BasicPageFields}
`;

const SingleFilterListing = ({filter, language, locale}) => {

    const [isLoading, setLoading] = useState(false);
    const [numOfShown, setNumOfShown] = useState(filter.itemPerPage)
    const [viewMode, setViewMode] = useState('list')

    /**
     * Show more results
     */
    function loadMore(fetchMoreTag, fetchMorePage, tag, itemPerPage) {
        setLoading(true)
        fetchMoreTag({
            variables: {
                preview,
                tag,
                offset: numOfShown,
                pageSize: itemPerPage
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult || !fetchMoreResult.tagCollection || !fetchMoreResult.tagCollection.items || !fetchMoreResult.tagCollection.items.length) return prev;
                const tag = fetchMoreResult.tagCollection.items[0];

                if (!tag.linkedFrom || !tag.linkedFrom.pageCollection || !tag.linkedFrom.pageCollection.items) return prev;

                const linkedFromCollection = tag.linkedFrom.pageCollection.items;
                const slugs = linkedFromCollection.map((page) => page.slug)

                fetchMorePage({
                    variables: { preview, locale, slugs, pageSize: filter.itemPerPage },
                    updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult || !fetchMoreResult.pageCollection || !fetchMoreResult.pageCollection.items || !fetchMoreResult.pageCollection.items.length) return prev;
                        let result = Object.assign({}, prev, {
                            pageCollection: {
                                ...prev.pageCollection,
                                items: [...prev.pageCollection.items, ...fetchMoreResult.pageCollection.items]
                            }
                        });
                        setLoading(false)
                        return result
                        
                    }
                })
            }
        });

        setNumOfShown(numOfShown + itemPerPage);
    }
    
    return <Query query={TagQuery} variables={{ preview, tag: filter.tag.tag, offset: 0, pageSize: filter.itemPerPage }}>
        {({ loading, error, data, fetchMore}) => {
            if (loading) return <Loading />;
            if (error) return <Error />;

            const fetchMoreTag = fetchMore;

            if (!data || !data.tagCollection || !data.tagCollection.items || !data.tagCollection.items.length) {
                return <Error />;
            }

            let tag = data.tagCollection.items[0];
            if (!tag.linkedFrom || !tag.linkedFrom.pageCollection || !tag.linkedFrom.pageCollection.items) {
                return <Error />;
            }
            const total = tag.linkedFrom.pageCollection.total;
            let slugs = tag.linkedFrom.pageCollection.items.map(page => page.slug);
            
            return <Query query={FullSlugPageQuery} variables={{ preview, locale, slugs, pageSize: filter.itemPerPage }}>
                {({ loading, error, data, fetchMore }) => {
                    if (loading) return <Loading />;
                    if (error) return <Error />;

                    const fetchMorePage = fetchMore;
        
                    if (!data || !data.pageCollection || !data.pageCollection.items || !data.pageCollection.items.length) {
                        return <Error />;
                    }

                    return <>
                        <div className="filteredlisting">
                            <section data-listing="default" className="o-listing -recipe">
                                <div className="m-listing-navbar">
                                    <nav aria-labelledby="viewtab" className="m-view-tabs">
                                        <button onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? "a-button -icon m-view-tabs__button active" : "a-button -icon m-view-tabs__button"}>
                                            <span className="icon-afn-recipebox-grid"></span>
                                        </button>
                                        <button onClick={() => setViewMode('list')} className={viewMode === 'list' ? "a-button -icon m-view-tabs__button active" : "a-button -icon m-view-tabs__button"}>
                                            <span className="icon-afn-list-view"></span>
                                        </button>
                                    </nav>
                                </div>

                                { viewMode === 'list' && <>
                                    <div className="o-data-listing">
                                        {data.pageCollection.items.map((page, i) => {
                                            return <div key={i} className="m-data-listing__item">
                                                <div className="m-content-box -large -left">
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <div className="m-content-box__content">
                                                                <div className="m-content-box__upper">
                                                                    <div className="m-icon-text">
                                                                        {!!page.foodLabelsCollection && !!page.foodLabelsCollection.items && !!page.foodLabelsCollection.items.length && <div className="m-icon-text-list">
                                                                            {page.foodLabelsCollection.items.map((foodLabel, i) => {
                                                                                return <div key={i} className="m-icon-text-listItem -small">
                                                                                    <div data-toggle="tooltip" data-placement="top" title="" className="m-icon-text-listItem__img w-tooltip" data-original-title="Halal">
                                                                                        <img src={'../../resources/images/food-icons/' + foodLabel.value + '.svg'} alt={foodLabel.name} title={foodLabel.name}  />
                                                                                    </div>
                                                                                </div>
                                                                            })}
                                                                        </div>}
                                                                    </div>
                                                                </div>
                                                                <div className="m-content-box__middle">
                                                                    <Link data-analytics-track-link to={'/' + language + page.slug}>
                                                                        <div className="cmp-title">
                                                                            <h3 className="cmp-title__text">{page.pageTitle ? page.pageTitle : page.title}</h3>
                                                                        </div>
                                                                    </Link>
                                                                    <div className="m-content-box__copy">
                                                                        <span>{page.description ? page.description.description : ''}</span> 
                                                                        <Link data-analytics-track-link to={'/' + language + page.slug} className="a-button -text">Explore More</Link>
                                                                    </div>
                                                                </div>
                                                                <div className="m-content-box__lower">
                                                                    <div className="m-content-box__ratings">
                                                                        <Link data-analytics-track-link to={'/' + language + page.slug} className="m-content-box__link no-underline"></Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-8">
                                                            <div className="m-content-box__image">
                                                                <Link data-analytics-track-link to={'/' + language + page.slug} className="a-linked-image">
                                                                    <div className="a-animated -zoom">
                                                                        { page.seoMetadataImage && page.seoMetadataImage.url && <LazyLoad placeholder={<LazyLoadPlaceHolder />} throttle={500}>
                                                                            <img src={page.seoMetadataImage.url} alt={page.pageTitle ? page.pageTitle : page.title} />
                                                                        </LazyLoad> }
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })}
                                        {data.pageCollection.items.length < total && !isLoading && <button onClick={() => loadMore(fetchMoreTag, fetchMorePage, filter.tag.tag, filter.itemPerPage)} className="a-button -secondary">Show More</button>}
                                    </div>
                                </>}
                                { viewMode === 'grid' && <>
                                    <div className="o-data-listing grouped-view">
                                        <div className="row row-eq-height m-data-listing-group__items">
                                            { data.pageCollection.items.map((page, i) => {
                                                return <div key={i} className="col-12 col-md-4 m-data-listing__item no-tag">
                                                    <div className="m-signpost">
                                                        <div className="a-signpost__thumbnail">
                                                            <Link data-analytics-track-link to={'/' + language + page.slug} className="a-linked-image a-signpost__link">
                                                                <div className="a-animated -zoom">
                                                                    <LazyLoad placeholder={<LazyLoadPlaceHolder />} throttle={1000}>
                                                                        <img src={page.seoMetadataImage && page.seoMetadataImage.url} alt={page.pageTitle ? page.pageTitle : page.title} />
                                                                    </LazyLoad>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        <div className="m-signpost__content">
                                                            <div className="a-signpost__title">
                                                                <Link data-analytics-track-link to={'/' + language + page.slug} className="a-signpost__link">
                                                                    <h4>{page.pageTitle ? page.pageTitle : page.title}</h4>
                                                                </Link>
                                                            </div>
                                                            <div className="m-signpost__ratings">
                                                                <Link data-analytics-track-link to={'/' + language + page.slug} rating-categoryid="afn_ratings_reviews_default_configuration" rating-streamid="xxx" className="a-signpost__link no-underline">
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>})
                                            }
                                        </div>
                                        {data.pageCollection.items.length < total && !isLoading && <button onClick={() => loadMore(fetchMoreTag, fetchMorePage, filter.tag.tag, filter.itemPerPage)} className="a-button -secondary">Show More</button>}
                                    </div>
                                </>}
                            </section>
                        </div>
                    </>
                }}
            </Query>
        }}
    </Query>;
}

SingleFilterListing.propTypes = propTypes;
SingleFilterListing.defaultProps = defaultProps;

export default SingleFilterListing;