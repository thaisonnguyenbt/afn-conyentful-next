import React from 'react';
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import LazyLoadPlaceHolder from '../../structure/LazyLoadPlaceHolder';

const FullFilterListingItemGridView = ({page, language}) => {
    return <>
        <div className="m-signpost">
            <div className="a-signpost__thumbnail">
                <Link to={'/' + language + page.slug} className="a-linked-image a-signpost__link">
                    <div className="a-animated -zoom">
                        <LazyLoad placeholder={<LazyLoadPlaceHolder />} throttle={1000}>
                            <img src={page.seoMetadataImage && page.seoMetadataImage.url} alt={page.pageTitle ? page.pageTitle : page.title} />
                        </LazyLoad>
                    </div>
                </Link>
            </div>
            <div className="m-signpost__content">
                <div className="a-signpost__title">
                    <Link to={'/' + language + page.slug} className="a-signpost__link">
                        <h4>{page.pageTitle ? page.pageTitle : page.title}</h4>
                    </Link>
                </div>
                <div className="m-signpost__ratings">
                    <Link to={'/' + language + page.slug} rating-categoryid="afn_ratings_reviews_default_configuration" rating-streamid="xxx" className="a-signpost__link no-underline">
                    </Link>
                </div>
            </div>
        </div>
    </>
}

export default FullFilterListingItemGridView;