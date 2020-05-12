import React from 'react';
import OwlCarousel from 'react-owl-carousel2';
import {Link} from 'react-router-dom'

const options = {
    items: 1,
    nav: true,
    dots: true,
    margin: 10,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 12000,
    loop : true,
    navText: ['<button type="button" role="presentation" class="owl-prev"><span class="icon-afn-navigate-left"></span></button>', 
        '<button type="button" role="presentation" class="owl-next"><span class="icon-afn-navigate-right"></span></button>']
};

const Carousel = ({data, language}) => {
    let items = []
        
    if (data && data.itemsCollection && data.itemsCollection.items) {
        items = data.itemsCollection.items;
    }
    return <>
        <div className="cmp-carousel">
            <div className="cmp-carousel__content o-carousel-container -mixed owl-carousel owl-theme owl-loaded" data-carousel="mixed" carousel-loop="true" carousel-arrows="true" carousel-dots="true" pause-onhover="true" autoplay-mode="true" autoplay-duration="7000">
                <OwlCarousel options={options}>
                    {items.map((item, i) => {
                        return <div role="tabpanel" className="cmp-carousel__item m-carousel-slide" data-cmp-hook-carousel="item" key={i}>
                            <div className="featuredsignpost">
                                <div className="m-featured-signpost">
                                    <Link to={language + item.featuredURL}>
                                        <div className="m-featured-signpost__background">
                                            <div className="cmp-image" data-cmp-src={item.image.url} itemScope="" itemType="http://schema.org/ImageObject">
                                                <img src={item.image.url} className="cmp-image__image" title={item.title} alt={item.title} itemProp="contentUrl" data-cmp-hook-image="image" />
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="m-featured-signpost__overlay">
                                        <div className="a-category-tag">
                                            <span className="a-category-tag__title">{item.categoryTag.name}</span>
                                        </div>
                                        <Link className="a-featured-signpost__link" to={language + item.featuredURL}>
                                            <div className="cmp-title">
                                                <h1 className="cmp-title__text">{item.title}</h1>
                                            </div>
                                        </Link>
                                        <div className="a-featured-signpost__subtitle">
                                            <div className="cmp-text">
                                                <p>{item.subtitle}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </OwlCarousel>
            </div>
        </div>
    </>
}

export default Carousel;