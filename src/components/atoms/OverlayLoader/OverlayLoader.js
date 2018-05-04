import React from 'react';
import PropTypes from 'prop-types';

//styles
import s from './OverlayLoader.mod.scss';

//component
import Loader from 'halogen/SyncLoader';


//renders a loader over the parent full coverage
function OverlayLoader(props) {
	return props.show && (<div className={s.overlayContainer} style={{"z-index": props.zIndex || 1}} >
    <Loader color="#4abdac" size="16px" />
  </div>);
}

OverlayLoader.propTypes = {
	show: PropTypes.bool,
	zIndex: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
};

export default OverlayLoader;
