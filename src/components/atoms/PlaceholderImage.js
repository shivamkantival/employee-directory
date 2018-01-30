import React from 'react';

import {Image} from 'react-bootstrap';

function PlaceholderImage(props) {
	const {imageStyles, source, onLoad, onError, error, fallbackImg, placeholderStyle} = props;
	
	const ImageElem = (!error && <Image className={imageStyles} src={source} onLoad={onLoad} onError={onError} />);
	return (<div className={placeholderStyle}  style={{backgroundImage: `url(${fallbackImg})`}} >{ImageElem}</div>);
}

export default PlaceholderImage;
