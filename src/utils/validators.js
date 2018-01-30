//constants
import {
	CANNOT_BE_EMPTY,
	NOT_VALID
} from "constants/formErrors";
import TEAMS from 'constants/teams';
import LOCATIONS from 'constants/timezoneConstants';
import urlValidator from 'valid-url';

//utils
import _isUndefined from 'lodash/isUndefined';
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
	if (!_isString(value) || _isUndefined(value) || value === '') {
		return CANNOT_BE_EMPTY;
	}
	return undefined;
}

export function optionNotEmpty(value) {
	if (_isEmpty(value)) {
		return CANNOT_BE_EMPTY;
	}
	return undefined;
}

export function validateName(value) {
	if (!/^[A-Za-z\.\- ]+$/.test(value)) {
		return NOT_VALID;
	}
	return undefined;
}

export function validateTeam(value) {
	return validateSelectorValue(TEAMS, value);
}

export function validateLocation(value) {
	return validateSelectorValue(LOCATIONS, value);
}

export function validateURL(value) {
	if (!urlValidator.isUri(value)) {
		return NOT_VALID;
	}
	return undefined;
}

// We can only populate keys in errors for which value exist
// this method mutates object as validator creates new object every time validation is run
export function populateErrors(errors, computedFieldError, fieldType) {
	if (computedFieldError) {
		errors[fieldType] = computedFieldError;
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
}