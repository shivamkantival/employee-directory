import React from 'react';
import PropTypes from 'prop-types';
//utils
import {pure} from 'recompose';

//constants
import ICON_SIZES from './sizeConstants';

//styles
import s from './HoverIcon.mod.scss';

const SIZE_TO_CONTAINER_SIZE = {
  [ICON_SIZES.SMALL]: '20px',
  [ICON_SIZES.MEDIUM]: '40px',
  [ICON_SIZES.LARGE]: '60px',
};

function HoverIcon(props) {
  const {backgroundColor, image, iconSize} = props,
    iconDimension = SIZE_TO_CONTAINER_SIZE[iconSize || ICON_SIZES.MEDIUM];
  
  return (
    <div style={{width: iconDimension, height: iconDimension}} className={'pos-rel'}>
      <img src={image} className={s.image}/>
      <div style={{backgroundColor: backgroundColor}} className={s.iconBackground} />
    </div>)
}

HoverIcon.propTypes = {
  backgroundColor: PropTypes.string,
  image: PropTypes.string,
  iconSize: PropTypes.string,
}

export default pure(HoverIcon);
