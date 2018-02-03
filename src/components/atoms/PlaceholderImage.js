import React from 'react';
import PropTypes from 'prop-types';

//components
import {Image} from 'react-bootstrap';

//utils
import {pure} from 'recompose';

//renders an image that shows the placeholder while loading actual image or if actual image is not available due to some reason
function PlaceholderImage(props) {
  const {imageStyles, source, onLoad, onError, hasError, fallbackImg, placeholderStyle} = props;
  
  const ImageElem = (!hasError && <Image className={imageStyles} src={source} onLoad={onLoad} onError={onError} />);
  return (<div className={placeholderStyle}  style={{backgroundImage: `url(${fallbackImg})`}} >{ImageElem}</div>);
}

PlaceholderImage.propTypes = {
  imageStyles: PropTypes.string,
  source: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  hasError: PropTypes.bool,
  fallbackImg: PropTypes.string,
  placeholderStyle: PropTypes.string,
}

//to prevent unnecessary renders
export default pure(PlaceholderImage);
