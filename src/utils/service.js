import queryString from 'query-string';
import _reduce from 'lodash/reduce';
import _isEmpty from 'lodash/isEmpty';

function getSanitizedQueryParams(params) {
	return _reduce(params, (accumulator, value, key) => {
		if (!_isEmpty(value)) {
			accumulator[key] = value;
		}
		return accumulator;
	}, {});
}

export function adaptToQueryString(params) {
	const sanitizedQueryParams = getSanitizedQueryParams(params);
	return queryString.stringify(sanitizedQueryParams);
}

export default {
	adaptToQueryString,
};
