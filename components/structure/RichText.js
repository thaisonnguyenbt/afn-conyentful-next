import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

import Carousel from '../content/Carousel'
import Article from '../content/Article'
import Recipe from '../content/Recipe'
import ContentFeed from '../content/contentFeed/ContentFeed'
import SingleFilterListing from '../content/SingleFilterListing'
import FullFilterListing from '../content/fullFilterListing/FullFilterListing'
import LazyLoad from 'react-lazyload'
import LazyLoadPlaceHolder from './LazyLoadPlaceHolder';
import SiblingPagination from '../content/SiblingPagination';
import CategoryTags from '../content/CategoryTags';
import BrightcovePlayer from '../content/brightcovePlayer/BrightcovePlayer';

const RichText = ({pageContent, language, locale, slug, tags}) => {
    let content = JSON.parse(JSON.stringify(pageContent));

    if (content.links && content.json.content && content.json.content.length) {
        content.json.content.forEach((node, i) => {
            if (node.data.target) {
                let id = node.data.target.sys.id;
                if (node.nodeType === "embedded-asset-block") {
                    if (content.links.assets && content.links.assets.block && content.links.assets.block.length) {
                        let filterAssess = content.links.assets.block.filter((asset) => asset.sys.id === id);
                        if (filterAssess.length) {
                            node.data.target.fields = filterAssess[0];
                        }
                    }
                } else if (node.nodeType === "embedded-entry-block") {
                    if (content.links.entries && content.links.entries.block && content.links.entries.block.length) {
                        let filterEntries = content.links.entries.block.filter((entry) => entry.sys.id === id);
                        if (filterEntries.length) {
                            node.data.target.fields = filterEntries[0];
                        }
                    }
                }
            }
        })
    }

    const options = {
        renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (asset) => {
                if (!asset.data.target || !asset.data.target.fields || !asset.data.target.fields.url) {
                    return <></>
                }
                const file = asset.data.target.fields;
                return <>
                    {file.contentType.startsWith("image") && 
                        <LazyLoad placeholder={<LazyLoadPlaceHolder />} throttle={500}>
                            <img src={file.url} alt={file.fileName} title={file.fileName} />
                        </LazyLoad>}
                </>
            },
            [BLOCKS.EMBEDDED_ENTRY]: (node) => {
                
                if (!node.data.target.fields) {
                    return null;
                }
                
                const contentType = node.data.target.fields.__typename;
                if (contentType === `Carousel`) {
                    return <Carousel data={node.data.target.fields} language={language} />
                } else if (contentType === `ContentFeed`) {
                    return <ContentFeed contentFeed={node.data.target.fields} language={language} />
                } else if (contentType === `SingleFilterListing`) {
                    return <SingleFilterListing filter={node.data.target.fields} language={language} locale={locale}/>
                } else if (contentType === `MultipleFilterListing`) {
                    return <FullFilterListing filter={node.data.target.fields} language={language} locale={locale}/>
                } else if (contentType === `Recipe`) {
                    return <Recipe recipe={node.data.target.fields} language={language} locale={locale} foodLabels={[]} />
                } else if (contentType === `Article`) {
                    return <Article article={node.data.target.fields} language={language} locale={locale} tags={[]} />
                } else if (contentType === 'SiblingPagination') {
                    return <SiblingPagination slug={slug} language={language} locale={locale} />
                } else if (contentType === 'CategoryTags') {
                    return <CategoryTags tags={tags} language={language} />
                } else if (contentType === 'BrightcoveVideo') {
                    return <BrightcovePlayer videoId={node.data.target.fields.videoPlayer} />
                } else {
                    return;
                }
            }
        }
    };

    var richText = documentToReactComponents(content.json, options)

    return <>
        {richText}
    </>;
}

export default RichText;