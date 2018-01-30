import React from 'react';

import {Image} from 'react-bootstrap';
import {pure} from 'recompose';

function PlaceholderImage(props) {
	const {imageStyles, source, onLoad, onError, hasError, fallbackImg, placeholderStyle} = props;
	
	const ImageElem = (!hasError && <Image className={imageStyles} src={source} onLoad={onLoad} onError={onError} />);
	return (<div className={placeholderStyle}  style={{backgroundImage: `url(${fallbackImg})`}} >{ImageElem}</div>);
}

export default pure(PlaceholderImage);
