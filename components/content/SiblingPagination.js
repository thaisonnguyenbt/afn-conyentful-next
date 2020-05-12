import React from 'react';
import { Link } from 'react-router-dom'
import { BasicPageFields, TagFields, AssetFields } from '../../utils/fragments';
import Error from '../structure/Error';
import { preview } from '../../config/apollo-client';
import { gql } from '@apollo/client';
import { Query } from "react-apollo";

/**
 * get all page slugs referencing to the current page
 */
const SlugsQuery = gql`
    query pageCollection($preview: Boolean!, $slug: String!) {
        pageCollection(preview: $preview, limit: 1, where: {slug: $slug}) {
            items {
                linkedFrom {
                    pageCollection {
                        items {
                            childrenCollection {
                                items {
                                    slug
                                }
                            }
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

const SiblingPagination = ({ slug, language, locale }) => {
    return <> 
        <Query query={SlugsQuery} variables={{ preview, slug : slug }}>
            {({ loading, error, data }) => {
                if (loading) return <></>
                if (error) return <Error />

                
                if (!data || !data.pageCollection || !data.pageCollection.items || !data.pageCollection.items.length) {
                    return <></>;
                }

                const page = data.pageCollection.items[0];
                if (!page.linkedFrom || !page.linkedFrom.pageCollection || !page.linkedFrom.pageCollection.items || !page.linkedFrom.pageCollection.items.length) {
                    return <></>
                }
                const parent = page.linkedFrom.pageCollection.items[0];
                if (!parent.childrenCollection || !parent.childrenCollection.items || !parent.childrenCollection.items.length) {
                    return <></>
                }

                let index = -1;
                parent.childrenCollection.items.forEach((page, i) => {
                    if (page.slug === slug) {
                        index = i;
                    }
                });

                let siblings = [], prevSlug = "", nextSlug = "";
                if (index > 0) {
                    prevSlug = parent.childrenCollection.items[index - 1].slug;
                    siblings.push(prevSlug);
                }
                if (index < parent.childrenCollection.items.length - 1) {
                    nextSlug = parent.childrenCollection.items[index + 1].slug;
                    siblings.push(nextSlug);
                }

                return <Query query={FullSlugPageQuery} variables={{ preview, locale, pageSize: 2, slugs : siblings }}>
                    {({ loading, error, data }) => {
                        if (loading) return <></>
                        if (error) return <Error />

                        if (!data || !data.pageCollection || !data.pageCollection.items || !data.pageCollection.items.length) {
                            return <></>
                        }

                        let prev = null, next = null;
                        data.pageCollection.items.forEach((item, i) => {
                            if (nextSlug === item.slug) {
                                next = item;
                            }
                            if (prevSlug === item.slug) {
                                prev = item;
                            }
                        });

                        return <>
                            <div className="siblingpagination">
                                <div className="row m-default-pagination-img" data-pagination="default">
                                    { !!prev && <div className="col-md-6 col-6 m-default-pagination-img__prev p-0">
                                        <div className="pagination-card ">
                                            <Link to={'/' + language + prev.slug}>
                                                <div className="row no-gutters">
                                                    <div className="col-md-4 order-md-2">
                                                        { prev.seoMetadataImage && prev.seoMetadataImage && <div className="a-bg-img" style={{backgroundImage : `url(${prev.seoMetadataImage.url})`}}></div> }
                                                    </div>
                                                    <div className="col-md-8 order-md-1">
                                                        <div className="pagination-card__body">
                                                            <span className="icon-afn-navigate-left"></span>
                                                            <h5 className="card-title">Prev</h5>
                                                            <p className="card-text clamp-3">{prev.pageTitle ? prev.pageTitle : prev.title}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div> }
                                    { !!next && <div className="col-md-6 col-6 m-default-pagination-img__next p-0">
                                        <div className="pagination-card ">
                                            <Link to={'/' + language + next.slug}>
                                                <div className="row no-gutters">
                                                    <div className="col-md-4">
                                                        { next.seoMetadataImage && next.seoMetadataImage.url && <div className="a-bg-img" style={{backgroundImage : `url(${next.seoMetadataImage.url})`}}></div> }
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="pagination-card__body">
                                                            <h5 className="card-title">Next</h5>
                                                            <p className="card-text clamp-3">{next.pageTitle ? next.pageTitle : next.title}</p>
                                                            <span className="icon-afn-navigate-right"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </>
                    }}
                </Query>
            }}
        </Query>
    </> 
}

export default SiblingPagination;