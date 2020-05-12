import React from 'react';
import LazyLoad from 'react-lazyload'
import SingleFeedtile from './SingleFeedTile'
import { Link } from 'react-router-dom'
import LazyLoadPlaceHolder from '../../structure/LazyLoadPlaceHolder';

const ContentFeed = ({contentFeed, language}) => {

    if (!contentFeed.tilesCollection) {
        return;
    }

    const tiles = contentFeed.tilesCollection.items;
    if (!tiles || !tiles.length) {
        return;
    }

    return <div className="contentfeed aem-GridColumn aem-GridColumn--default--10">
        <section className="o-content-feed">

            {tiles.length === 1 && <SingleFeedtile feed={tiles[0]} language={language} />}

            {tiles.length === 2 && tiles.map((feed, i) => {
                return <SingleFeedtile feed={tiles[0]} language={language} key={i} />
            })}
            {tiles.length >= 3 && <div className="row m-content-feed__lowerBracket">
                
                {tiles.map((feed, i) => {
                    if (!feed.image.url) {
                        return <></>;
                    }

                    return <div className={i === 0 ? '' : "col"} key={i}>
                        { i === 0 && <SingleFeedtile feed={tiles[0]} language={language} key={i} />}
                        { i > 0 && 
                            <div className="m-content-box -small">
                                <div className="m-content-box__image">
                                    <Link className="a-linked-image" to={'/' + language + feed.ctaPath} target={feed.isNewTab ? "_blank" : ""}>
                                        <div className="cmp-image a-animated -zoom" itemScope="">
                                            <LazyLoad placeholder={<LazyLoadPlaceHolder />} throttle={500}>
                                                <img src={feed.image.url} 
                                                    className="cmp-image__image" 
                                                    itemProp="contentUrl"
                                                    data-cmp-hook-image="image" 
                                                    alt={feed.title}
                                                    title={feed.title}/>
                                            </LazyLoad>
                                        </div>
                                    </Link>
                                </div>
                                <div className="m-content-box__content">
                                    <Link to={'/' + language + feed.ctaPath} target={feed.isNewTab ? "_blank" : ""}>
                                        <div className="cmp-title">
                                            <h3 className="cmp-title__text">{feed.title}</h3>
                                        </div>
                                    </Link>
                                    {!feed.isHideDesc && feed.description && <div className="m-content-box__copy">
                                        <span>{feed.description}</span>
                                    </div>}
                                </div>
                            </div>
                        }
                    </div>
                })}
                

            </div>}
            {contentFeed.ctaLabel && contentFeed.targetLink && <Link to={'/' + language + contentFeed.targetLink} target="_self" className="a-button-link">
                <button className="a-button -secondary">{contentFeed.ctaLabel}</button>
            </Link>}
        </section>
    </div>;
}

export default ContentFeed;