import React from 'react';
import PropTypes from 'prop-types';

function Alert(props) {
	const {type, message} = props;
	return (<div className={`alert alert-${type}`} >{message}</div>);
}

Alert.propTypes = {
	type: PropTypes.string,
	message: PropTypes.string,
};

export default Alert;
