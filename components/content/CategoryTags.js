import React from 'react';
import Dot from '../../resources/images/dot.svg'

const CategoryTags = ({tags, language}) => {
    return <>
        <div className="categorytag">
            <div className="category-tags-round">
                <div className="m-category-tags">
                    <div className="m-category-tags__label">Categories:</div>
                    <ul className="m-category-tags__list">
                        { tags.map((tag, i) => {
                            return <li key={i} className="m-category-tags__item">
                                <div className="a-category-tag">
                                    <a className="a-category-tag__title" href={ `${language}/search.html?search=${tag.tag}`}>
                                        {tag.name}
                                    </a>
                                    {i < tags.length - 1 && <img src={Dot} alt="" title="" />}
                                </div>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    </>
}

export default CategoryTags;