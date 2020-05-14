import React from 'react';
import Link from 'next/link'
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
                        <Link href="/[...slug]" as={'/' + language + page.slug}>
                            <a>
                                <div className="cmp-title">
                                    <h3 className="cmp-title__text">
                                        {page.pageTitle ? page.pageTitle : page.title}
                                    </h3>
                                </div>
                            </a>
                        </Link>
                        <div className="m-content-box__copy">
                            <span>{page.description && page.description.description}</span> 
                            <Link href="/[...slug]" as={'/' + language + page.slug}>
                                <a className="a-button -text">
                                    Explore More
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="m-content-box__lower">
                        <div className="m-content-box__ratings">
                            <Link href="/[...slug]" as={'/' + language + page.slug}>
                                <a className="m-content-box__link no-underline"></a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-8">
                <div className="m-content-box__image">
                    <Link href="/[...slug]" as={'/' + language + page.slug}>
                        <a className="a-linked-image a-signpost__link">
                            <div className="a-animated -zoom">
                                <LazyLoad placeholder={<LazyLoadPlaceHolder />} throttle={500}>
                                    <img src={page.seoMetadataImage && page.seoMetadataImage.url} alt={page.pageTitle ? page.pageTitle : page.title} />
                                </LazyLoad>
                            </div>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    </div>
}

export default FullFilterListingItemListView;