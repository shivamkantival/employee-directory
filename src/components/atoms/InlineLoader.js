import React from 'react';
import PropTypes from 'prop-types';

import Loader from 'halogen/PulseLoader';

export const SIZES = {
	sm: "10px",
	md: "20px",
	lg: "30px",
};

function InlineLoader(props) {
	return (
		<Loader className={props.loaderClass} color="#4DAF7C" size={props.size} margin="5px" />
	);
}

InlineLoader.propTypes = {
	loaderClass: PropTypes.string,
	size: PropTypes.string,
};

export default InlineLoader;
