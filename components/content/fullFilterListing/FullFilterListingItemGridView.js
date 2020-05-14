import React from 'react';
import Link from 'next/link'
import LazyLoad from 'react-lazyload'
import LazyLoadPlaceHolder from '../../structure/LazyLoadPlaceHolder';

const FullFilterListingItemGridView = ({page, language}) => {
    return <>
        <div className="m-signpost">
            <div className="a-signpost__thumbnail">
                <Link href="/[...slug]" as={'/' + language + page.slug}>
                    <a className="a-linked-image a-signpost__link">
                        <div className="a-animated -zoom">
                            <LazyLoad placeholder={<LazyLoadPlaceHolder />} throttle={1000}>
                                <img src={page.seoMetadataImage && page.seoMetadataImage.url} alt={page.pageTitle ? page.pageTitle : page.title} />
                            </LazyLoad>
                        </div>
                    </a>
                </Link>
            </div>
            <div className="m-signpost__content">
                <div className="a-signpost__title">
                    <Link href="/[...slug]" as={'/' + language + page.slug}>
                        <a className="a-signpost__link">
                            <h4>{page.pageTitle ? page.pageTitle : page.title}</h4>
                        </a>
                    </Link>
                </div>
                <div className="m-signpost__ratings">
                    <Link href="/[...slug]" as={'/' + language + page.slug}>
                        <a className="a-signpost__link no-underline"></a>
                    </Link>
                </div>
            </div>
        </div>
    </>
}

export default FullFilterListingItemGridView;