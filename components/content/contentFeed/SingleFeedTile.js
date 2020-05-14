import React from 'react';
import Link from 'next/link';
import LazyLoad from 'react-lazyload'
import LazyLoadPlaceHolder from '../../structure/LazyLoadPlaceHolder';

const propTypes = {};
const defaultProps = {};

const SingleTile = ({feed, language}) => {

    let categoryTagName = '';
    let navTarget = feed.isNewTab ? "_blank" : "";

    if (feed.categoryTag && feed.categoryTag.name) {
        categoryTagName = feed.categoryTag.name;
    }

    return  <div className="m-content-box -large -left">
        { feed.boxOrientation === 'left' && <div className="row">
            <div className="col-4">
                <div className="m-content-box__content">
                    { categoryTagName && <div className="a-category-tag">
                        <span className="a-category-tag__title">{categoryTagName}</span>
                    </div> }
                    { feed.ctaPath && <Link href="/[...slug]" as={'/' + language + feed.ctaPath}>
                        <a target={navTarget}>
                            <div className="cmp-title">
                                <h3 className="cmp-title__text">{feed.title}</h3>
                            </div>
                        </a>
                    </Link> }
                    { !feed.isHideDesc && feed.description && <div className="m-content-box__copy">
                        <span>{feed.description}</span>
                    </div> }
                </div>
            </div>
            <div className="col-8">
                <div className="m-content-box__image">
                    <Link href="/[...slug]" as={'/' + language + feed.ctaPath}>
                        <a target={navTarget}>
                            <div className="cmp-image a-animated -zoom"
                                itemType="http://schema.org/ImageObject">
                                { feed.image && feed.image.url && <LazyLoad placeholder={<LazyLoadPlaceHolder />} throttle={500}>
                                    <img src={feed.image.url}
                                        data-src={feed.image.url}						
                                        className="cmp-image__image" 
                                        itemProp="contentUrl"
                                        data-cmp-hook-image="image" 
                                        alt={feed.title}
                                        title={feed.title}/>
                                </LazyLoad> }
                            </div>
                        </a>
                    </Link>
                </div>
            </div>
        </div> }
        { feed.boxOrientation === 'right' && <div className="row">
            <div className="col-8">
                <div className="m-content-box__image">
                    <Link href="/[...slug]" as={'/' + language + feed.ctaPath}>
                        <a className="a-linked-image" target={navTarget}>
                            <div className="cmp-image a-animated -zoom"
                                data-cmp-src={feed.ctaPath}
                                data-title={feed.title}
                                itemScope=""
                                itemType="http://schema.org/ImageObject">
                                <LazyLoad placeholder={<LazyLoadPlaceHolder />} throttle={500}>
                                    <img src={feed.image.url}
                                        data-src={feed.image.url}						
                                        className="cmp-image__image" 
                                        itemProp="contentUrl"
                                        data-cmp-hook-image="image" 
                                        alt={feed.title}
                                        title={feed.title}/>
                                </LazyLoad>
                            </div>
                        </a>
                    </Link>
                </div>
            </div>
            <div className="col-4">
                <div className="m-content-box__content">
                    { categoryTagName && <div className="a-category-tag">
                        <span className="a-category-tag__title">{categoryTagName}</span>
                    </div> }

                    <Link href="/[...slug]" as={'/' + language + feed.ctaPath}>
                        <a target={navTarget}>
                            <div className="cmp-title">
                                <h3 className="cmp-title__text">{feed.title}</h3>
                            </div>
                        </a>
                    </Link>
                    
                    { !feed.isHideDesc && feed.description && <div className="m-content-box__copy">
                        <span>{feed.description}</span>
                    </div> }
                </div>
            </div>
        </div> }
    </div>
}

SingleTile.propTypes = propTypes;
SingleTile.defaultProps = defaultProps;

export default SingleTile;