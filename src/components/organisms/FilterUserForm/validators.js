import FIELD_TYPES from "constants/userDetailTypes";
import VALIDATORS, {
	populateErrors,
} from 'utils/validators';

import _isEmpty from 'lodash/isEmpty';

function validateName(value) {
	if (_isEmpty (value)){
		return;
	}
	return VALIDATORS.validateName(value);
}

function validateLocation(value) {
	if (_isEmpty (value)){
		return;
	}
	return VALIDATORS.validateLocation(value);
}

function validateTeam(value) {
	if (_isEmpty (value)){
		return;
	}
	return VALIDATORS.validateTeam(value);
}

function validator(values) {
	const errors = {};
	const firstNameError = validateName(values[FIELD_TYPES.FIRST_NAME]),
		lastNameError = validateName(values[FIELD_TYPES.LAST_NAME]),
		locationError = validateLocation(values[FIELD_TYPES.LOCATION]),
		teamError = validateTeam(values[FIELD_TYPES.TEAM]);
	
	populateErrors(errors, firstNameError, FIELD_TYPES.FIRST_NAME);
	populateErrors(errors, lastNameError, FIELD_TYPES.LAST_NAME);
	populateErrors(errors, locationError, FIELD_TYPES.LOCATION);
	populateErrors(errors, teamError, FIELD_TYPES.TEAM);
	return errors;
}

export default validator;