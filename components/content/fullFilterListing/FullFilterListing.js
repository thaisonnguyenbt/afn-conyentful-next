import React, { useState } from 'react';
import Link from 'next/link'
import { BasicPageFields, TagFields, AssetFields } from '../../../utils/fragments';
import { gql } from '@apollo/client';
import { Query } from "react-apollo";

import Loading from '../../structure/Loading';
import Error from '../../structure/Error';
import FullFilterListingItemListView from './FullFilterListingItemListView'
import FullFilterListingItemGridView from './FullFilterListingItemGridView'
import { preview } from '../../../config/apollo-client';

/**
 * Query for all pages - for the first filter option
 */
const AllPageQuery = gql`
    query pageCollection($preview: Boolean!,$locale: String!, $contentCategory: String!, $offset: Int!, $pageSize: Int!) {
        pageCollection(preview: $preview, locale: $locale, skip: $offset, limit: $pageSize, where: {contentCategory: {category: $contentCategory}}, order: sys_publishedAt_DESC) {
            skip
            limit
            total
            items {
                ...BasicPageFields
            }
        }
    }
    ${AssetFields}
    ${TagFields}
    ${BasicPageFields}
`;

/**
 * Query for pages that are referencing (using) a specific tag
 */
const TagQuery = gql`
    query tagCollection($preview: Boolean!, $tag: String!) {
        tagCollection(preview: $preview, limit: 1, where: {tag: $tag}) {
            items {
                linkedFrom {
                    pageCollection(limit: 10) {
                        items {
                            slug
                        }
                    }
                }
            }
        }
    }
`
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

const FullFilterListing = ({filter, locale, language}) => {

    const [isShowDropdown, setIsShowDropdown] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [numOfShown, setNumOfShown] = useState(filter.itemPerPage)
    const [selectedFilter, setSelectedFilter] = useState({title: "All"})
    const [viewMode, setViewMode] = useState('grid')

    /**
     * Highlight the current option when hover on it
     * 
     * @param {DocumentEvent} event 
     */
    function highlightDropdownOption(event) {
        event.target.classList.add("vs__dropdown-option--highlight");
        var sibling = event.target.parentNode.firstChild;
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== event.target) {
                sibling.classList.remove("vs__dropdown-option--highlight");
            }
            sibling = sibling.nextSibling
        }
    }

    /**
     * Show more results
     */
    function loadMore(fetchMore, contentCategory, itemPerPage) {
        
        setLoading(true)
        fetchMore({
            variables: {
                locale: locale,
                offset: numOfShown,
                contentCategory: contentCategory, 
                pageSize: itemPerPage
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                let result = Object.assign({}, prev, {
                    pageCollection: {
                        ...prev.pageCollection,
                        items: [...prev.pageCollection.items, ...fetchMoreResult.pageCollection.items]
                    }
                });
                setLoading(false)
                return result
            }
        });
        setNumOfShown(numOfShown + itemPerPage);
    }

    return <div className="fulllisting">
        <section data-listing="listingWithMultipleFilters" className="o-listing -recipe">
            <div className="m-listing-navbar">
                <nav aria-labelledby="filterdropdown" className="m-filter-dropdown">
                    <div className="m-filter-dropdown-container">
                        <div dir="auto" className={isShowDropdown ? "v-select m-filter-dropdown__list vs--single vs--unsearchable vs--open" : "v-select m-filter-dropdown__list vs--single vs--unsearchable"} data-get="categories" data-endpoint="/content/afn/global/en/recipes/_jcr_content/root/responsivegrid_582125638/container/fulllisting.filter.list.json" code="filterId">
                            <span className="vs__dropdown-toggle" role="button" onClick={() => setIsShowDropdown(!isShowDropdown)}>
                                <div className="vs__selected-options"> 
                                    {selectedFilter && <input placeholder={selectedFilter.title} readOnly="readOnly" aria-label="Search for option" type="search" autoComplete="off" className="vs__search"/> }
                                </div>
                                <div className="vs__actions">
                                    <button type="button" title="Clear selection" className="vs__clear" style={{display: 'none'}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
                                            <path d="M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z"></path>
                                        </svg>
                                    </button>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" role="presentation" className="vs__open-indicator">
                                        <path d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"></path>
                                    </svg>
                                    <div className="vs__spinner" style={{display: 'none'}}>Loading...</div>
                                </div>
                            </span>
                            { isShowDropdown && <ul role="listbox" className="vs__dropdown-menu" onMouseLeave={() => setIsShowDropdown(!isShowDropdown)}>
                                { filter && filter.filtersCollection.items && filter.filtersCollection.items.map((filter, i) => {
                                    return <li key={i} className="vs__dropdown-option"
                                        onClick={() => {setSelectedFilter(filter); setIsShowDropdown(!isShowDropdown); }}
                                        onKeyDown={() => {setSelectedFilter(filter); setIsShowDropdown(!isShowDropdown); }}
                                        onMouseOver={e => highlightDropdownOption(e)} 
                                        onFocus={e => highlightDropdownOption(e)}>
                                        {filter.title}
                                    </li>
                                })}
                            </ul> }
                        </div>
                    </div>
                </nav>
                <nav aria-labelledby="viewtab" className="m-view-tabs">
                    <button onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? "a-button -icon m-view-tabs__button active" : "a-button -icon m-view-tabs__button"}>
                        <span className="icon-afn-recipebox-grid"></span>
                    </button>
                    <button onClick={() => setViewMode('list')} className={viewMode === 'list' ? "a-button -icon m-view-tabs__button active" : "a-button -icon m-view-tabs__button"}>
                        <span className="icon-afn-list-view"></span>
                    </button>
                </nav>
            </div>

            { (!selectedFilter || !selectedFilter.subFiltersCollection || !selectedFilter.subFiltersCollection.items || !selectedFilter.subFiltersCollection.items.length) && <>
                <Query query={AllPageQuery} variables={{ preview, locale, offset: 0, contentCategory: filter.contentCategory.category, pageSize: filter.itemPerPage}}>
                    {({ loading, error, data, fetchMore }) => {
                        if (loading) return <Loading />;

                        if (error) return <Error />;

                        if (!data || !data.pageCollection || !data.pageCollection.items || !data.pageCollection.items.length) {
                            return <Error />;
                        }
                        return <>
                            { viewMode === 'list' && <>
                                <div className="o-data-listing">
                                    {data.pageCollection.items.map((page, i) => {
                                        return <div key={i} className="m-data-listing__item">
                                            <FullFilterListingItemListView page={page} language={language} />
                                        </div>
                                    })}
                                </div>
                                <br/>
                                {data.pageCollection.items.length < data.pageCollection.total && !isLoading && <button onClick={() => loadMore(fetchMore, filter.contentCategory.category, filter.itemPerPage)} className="a-button -secondary">Show More</button>}
                            </>}
                            { viewMode === 'grid' && <>
                                <div className="o-data-listing grouped-view">
                                    <div className="row row-eq-height m-data-listing-group__items">
                                        { data.pageCollection.items.map((page, i) => {
                                            return <div key={i} className="col-12 col-md-4 m-data-listing__item no-tag">
                                                <FullFilterListingItemGridView page={page} language={language} />
                                            </div>})}
                                    </div>
                                    {data.pageCollection.items.length < data.pageCollection.total && !isLoading && <button onClick={() => loadMore(fetchMore, filter.contentCategory.category, filter.itemPerPage)} className="a-button -secondary">Show More</button>}
                                </div>
                            </>}
                        </>
                    }}
                </Query>
            </>}
            { !!selectedFilter && !!selectedFilter.subFiltersCollection && !!selectedFilter.subFiltersCollection.items && !!selectedFilter.subFiltersCollection.items.length && <>
                {selectedFilter.subFiltersCollection.items.map((subfilter, i) => {
                    return <Query query={TagQuery} variables={{ preview, tag: subfilter.tag.tag}} key={i}>
                        {({ loading, error, data }) => {
                            if (loading) return <Loading />;

                            if (error) return <Error />;

                            if (!data || !data.tagCollection || !data.tagCollection.items || !data.tagCollection.items.length) {
                                return <Error />;
                            }

                            let tagObj = data.tagCollection.items[0];
                            if (!tagObj.linkedFrom || !tagObj.linkedFrom.pageCollection || !tagObj.linkedFrom.pageCollection.items) {
                                return <Error />;
                            }

                            const slugs = tagObj.linkedFrom.pageCollection.items.map((page) => page.slug);
                            
                            if (slugs.length) {
                                return <Query query={FullSlugPageQuery} variables={{ preview, locale, pageSize: filter.itemPerPage, slugs}}>
                                    {({ loading, error, data }) => {
                                        if (loading) return <Loading />;

                                        if (error) return <Error />;

                                        if (!data.pageCollection || !data.pageCollection.items) {
                                            return <Error />;
                                        }
                                        if (viewMode === 'list') {
                                            return <>
                                                <div className="o-data-listing listing-view">
                                                    <div className="m-data-listing-group">
                                                        <div className="m-data-listing-group__title">
                                                            <h3>{subfilter.tag.name}</h3>
                                                        </div>
                                                        { data.pageCollection.items.map((page, j) => {
                                                            return <div key={j} className="m-data-listing__item">
                                                                <FullFilterListingItemListView page={page} language={language} />
                                                            </div>
                                                        })}
                                                        <Link href="/[...slug]" as={'/' + language + subfilter.ctaPath}>
                                                            <a className="m-data-listing-group__link">
                                                                <button className="a-button -secondary">View All</button>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </>
                                        } else {
                                            return <>
                                                <div className="o-data-listing grouped-view">
                                                    <div className="m-data-listing-group">
                                                        <div className="m-data-listing-group__title">
                                                            <h3>{subfilter.tag.name}</h3>
                                                        </div>
                                                        <div className="row row-eq-height m-data-listing-group__items">
                                                            { data.pageCollection.items.map((page, j) => {
                                                                return <div key={j} className="col-12 col-md-4 m-data-listing__item">
                                                                    <FullFilterListingItemGridView page={page} language={language} />
                                                                </div>
                                                            })}
                                                        </div>
                                                        <Link href="/[...slug]" as={'/' + language + subfilter.ctaPath}>
                                                            <a className="m-data-listing-group__link">
                                                                <button className="a-button -secondary">View All</button>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    }}  
                                </Query>
                            }
                        }}
                    </Query>
                })}
            </>}
        </section>
    </div>
}

export default FullFilterListing;