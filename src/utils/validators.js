//constants
import {
	CANNOT_BE_EMPTY,
	NOT_VALID,
} from "constants/formErrors";
import TEAMS from 'constants/teams';
import LOCATIONS from 'constants/timezoneConstants';
import urlValidator from 'valid-url';

//utils
import _isString from 'lodash/isString';
import _findIndex from 'lodash/findIndex';
import _isEmpty from 'lodash/isEmpty';

function validateSelectorValue(options, value) {
	if (_findIndex(options, option => option.value === value) === -1) {
		return NOT_VALID;
	}
	return undefined;
}

export function stringNotEmpty(value) {
	if (!_isString(value) || _isEmpty(value)) {
		return CANNOT_BE_EMPTY;
	}
	return undefined;
}

export function optionNotEmpty(value) {
	return _isEmpty(value) ? CANNOT_BE_EMPTY : undefined;
}

export function validateName(value) {
	return _isString(value) && /^[A-Za-z\.\- ]+$/.test(value) ? undefined : NOT_VALID;
}

export function validateTeam(value) {
	return validateSelectorValue(TEAMS, value);
}

export function validateLocation(value) {
	return validateSelectorValue(LOCATIONS, value);
}

export function validateURL(value) {
	const result = urlValidator.isUri(value);
	if (!urlValidator.isUri(value)) {
		return NOT_VALID;
	}
	return undefined;
}

// We can only populate keys in errors for which value exist
// this method mutates object as validator creates new object every time validation is run
export function populateErrors(errors, computedFieldError, fieldType) {
	if (computedFieldError) {
		return {
			...errors,
			[fieldType]: computedFieldError,
		};
	}
	return errors;
}


export default {
	stringNotEmpty,
	validateName,
	validateLocation,
	validateURL,
	optionNotEmpty,
	validateTeam,
	populateErrors,
};
