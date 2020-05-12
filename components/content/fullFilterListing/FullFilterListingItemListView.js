import React from 'react';
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import LazyLoadPlaceHolder from '../../structure/LazyLoadPlaceHolder';

const FullFilterListingItemListView = ({page, language}) => {
    return <div className="m-content-box -large -left">
        <div className="row">
            <div className="col-4">
                <div className="m-content-box__content">
                    <div className="m-content-box__upper">
                        <div className="m-icon-text">
                            {!!page.foodLabelsCollection && !!page.foodLabelsCollection.items && !!page.foodLabelsCollection.items.length && <div className="m-icon-text-list">
                                {page.foodLabelsCollection.items.map((foodLabel, i) => {
                                    return <div key={i} className="m-icon-text-listItem -small">
                                        <div data-toggle="tooltip" data-placement="top" title="" className="m-icon-text-listItem__img w-tooltip" data-original-title="Halal">
                                            <img src={'../../../resources/images/food-icons/' + foodLabel.value + '.svg'} alt={foodLabel.name} title={foodLabel.name}  />
                                        </div>
                                    </div>
                                })}
                            </div>}
                        </div>
                    </div>
                    <div className="m-content-box__middle">
                        <Link to={'/' + language + page.slug}>
                            <div className="cmp-title">
                                <h3 className="cmp-title__text">
                                    {page.pageTitle ? page.pageTitle : page.title}
                                </h3>
                            </div>
                        </Link>
                        <div className="m-content-box__copy">
                            <span>{page.description && page.description.description}</span> 
                            <Link to={'/' + language + page.slug} className="a-button -text">
                                Explore More
                            </Link>
                        </div>
                    </div>
                    <div className="m-content-box__lower">
                        <div className="m-content-box__ratings">
                            <Link to={'/' + language + page.slug} rating-categoryid="afn_ratings_reviews_default_configuration" rating-streamid="xxx" className="m-content-box__link no-underline">
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-8">
                <div className="m-content-box__image">
                    <Link to={'/' + language + page.slug}  className="a-linked-image a-signpost__link">
                        <div className="a-animated -zoom">
                            <LazyLoad placeholder={<LazyLoadPlaceHolder />} throttle={500}>
                                <img src={page.seoMetadataImage && page.seoMetadataImage.url} alt={page.pageTitle ? page.pageTitle : page.title} />
                            </LazyLoad>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
}

export default FullFilterListingItemListView;