import { gql } from '@apollo/client';

/**
 * Asset fields
 */
export const AssetFields = gql`
    fragment AssetFields on Asset {
        sys {
            id
        }
        fileName
        url
        contentType
        width
        height
    }
`

/**
 * Tag fields
 */
export const TagFields = gql`
    fragment TagFields on Tag {
        tag
        name
    }
`

export const BrightcoveVideoFields = gql`
    fragment BrightcoveVideoFields on BrightcoveVideo {
        videoPlayer
        videoPlayerSearch
    }
`

/**
 * Tag fields
 */
export const CarouselFields = gql`
    fragment CarouselFields on Carousel {
        name
        itemsCollection {
            items {
                name
                title
                subtitle
                panelTitle
                categoryTag {
                    ...TagFields
                }
                featuredUrl
                openNewTab
                image {
                    ... on Asset {
                        ...AssetFields
                    }
                }
            }
        }
        
    }
`

/**
 * Page Linkfrom field, reference to parent page
 */
export const LinkFromFields = gql`
    fragment LinkFromFields on Page {
        navigationTitle
        pageTitle
        slug
        slug
    }
`

/**
 * Read 5 levels of parent to render breadcrumb
 */
export const LinkFromRecursive = gql`
    fragment LinkFromRecursive on Page {
        linkedFrom {
            pageCollection(limit: 1) {
                items {
                    ...LinkFromFields
                    linkedFrom {
                        pageCollection(limit: 1) {
                            items {
                                ...LinkFromFields
                                linkedFrom {
                                    pageCollection(limit: 1) {
                                        items {
                                            ...LinkFromFields
                                            linkedFrom {
                                                pageCollection(limit: 1) {
                                                    items {
                                                        ...LinkFromFields
                                                        linkedFrom {
                                                            pageCollection(limit: 1) {
                                                                items {
                                                                    ...LinkFromFields
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

/**
 * ContentFeed Component
 */
export const ContentFeedFields = gql`
    fragment ContentFeedFields on ContentFeed {
        name
        ctaLabel
        openNewTab
        targetLink
        tilesCollection {
            items {
                name
                title
                description
                ctaPath
                boxOrientation
                categoryTag {
                    ...TagFields
                }
                isHideDesc
                image {
                    ... on Asset {
                        ...AssetFields
                    }
                }
                isNewTab
            }
        }
    }
`

/**
 * Recipe overview fields
 */
export const RecipeFields = gql`
    fragment RecipeFields on Recipe {
        recipeTitle
        ownerName
        ownerPath
        ownerLogo {
            ...AssetFields
        }
        recipeDescription
        mastheadType {
            name
            type
        }
        imageMasthead {
            ...AssetFields
        }
        videoPlayer
        videoPlayerSearch
        recipeThumbnail {
            ...AssetFields
        }
        difficultyLevel {
            ...TagFields
        }
        recipeStepsNo
        recipeIngredientsNo
        recipePreparationTime
        recipeCookTime
        recipeCleanUpTime
    }
`

/**
 * Article Overview fields
 */
export const ArticleFields = gql`
    fragment ArticleFields on Article {
        articleTitle
        articleDescription
        mastheadType {
            name
            type
        }
        imageMasthead {
            ...AssetFields
        }
        account
        author
        videoPlayer
        videoPlayerSearch
        articleDate
        showCopyLink
        showEmailBtn
    }
`

/**
 * Single Filter Listing Fields
 */
export const SingleFilterListingFields = gql`
    fragment SingleFilterListingFields on SingleFilterListing {
        name
        tag {
            ...TagFields
        }
        itemPerPage
        sortByField
        sortByOrder
    }
`

/**
 * Filter Fields for Multi Filter Listing
 */
export const FilterFields = gql`
    fragment FilterFields on Filter {
        name
        title
        tag {
            ...TagFields
        }
        ctaPath
        subFiltersCollection (limit: 10) {
            items {
                name
                title
                tag {
                    ...TagFields
                }
                ctaPath
            }
        }
    }
`

/**
 * Multiple Filter Listing compoennt in recipes page
 */
export const MultipleFilterListingFields = gql`
    fragment MultipleFilterListingFields on MultipleFilterListing {
        name
        defaultFilter
        itemPerPage
        sortByField
        sortByOrder
        contentCategory {
            name
            category
        }
        filtersCollection (limit : 10) {
            items {
                ... on Filter {
                    ...FilterFields
                }
            }
        }
    }
`

/**
 * Page Content - Free text component fragment
 */
export const PageContentFragment = gql`
    fragment PageContentFragment on Page {
        content {
            json
            links {
                entries {
                    block {
                        sys {
                            id
                        }
                        ... on Carousel {
                            ...CarouselFields
                        }
                        ... on ContentFeed {
                            ...ContentFeedFields
                        }
                        ... on SingleFilterListing {
                            ...SingleFilterListingFields
                        }
                        ... on MultipleFilterListing {
                            ...MultipleFilterListingFields
                        }
                        ... on Recipe {
                            ...RecipeFields
                        }
                        ... on Article {
                            ...ArticleFields
                        }
                        ... on BrightcoveVideo {
                            ...BrightcoveVideoFields
                        }
                    }
                }
                assets {
                    block {
                        ...AssetFields
                    }
                }
            }
        }
    }
`

/**
 * Full page field query in details page
 */
export const FullPageFields = gql`
    fragment FullPageFields on Page {
        title
        slug
        description
        pageTitle
        isRoot
        isHideInNav
        isHideInSecondNav
        isOpenInNewTab
        subtitle
        redirect
        navigationTitle
        seoMetadataImage {
            ...AssetFields
        }
        contentCategory {
            category
        }
        ...PageContentFragment
        rightPanel {
            json
        }
        tagsCollection {
            items {
                ...TagFields
            }
        }
        foodLabelsCollection {
            items {
                name
                value
            }
        }
        ...LinkFromRecursive
    }
`

/**
 * Basic page fields in filter listing queries
 */
export const BasicPageFields = gql`
    fragment BasicPageFields on Page {
        title
        slug
        description
        pageTitle
        isOpenInNewTab
        subtitle
        redirect
        navigationTitle
        seoMetadataImage {
            ...AssetFields
        }
        tagsCollection {
            items {
                ...TagFields
            }
        }
        foodLabelsCollection {
            items {
                name
                value
            }
        }
    }
`

/**
 * Page Navigation fields to read header navigation info
 */
export const PageNavigationFields = gql`
    fragment PageNavigationFields on Page {
        slug
        slug
        description
        pageTitle
        isRoot
        isHideInNav
        isHideInSecondNav
        isOpenInNewTab
        subtitle
        redirect
        navigationTitle
    }
`

