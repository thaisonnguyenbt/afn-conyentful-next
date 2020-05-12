import React from 'react';
import loadingImg from '../../resources/images/afn-1920x1280-lowres.jpg';

const LazyLoadPlaceHolder = () => {
    return <div>
        <img src={loadingImg} alt="" title="" className="cmp-image__image"/>
    </div>;
}

export default LazyLoadPlaceHolder;