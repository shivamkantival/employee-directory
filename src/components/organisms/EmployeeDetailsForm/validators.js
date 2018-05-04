import FIELD_TYPES from "constants/userDetailTypes";
import VALIDATORS, {
	populateErrors,
} from 'utils/validators';

function validateName(value) {
	return VALIDATORS.stringNotEmpty(value) || VALIDATORS.validateName(value);
}

function validateLocation(value) {
	return VALIDATORS.optionNotEmpty(value) || VALIDATORS.validateLocation(value);
}

function validateImage(value) {
	return VALIDATORS.stringNotEmpty(value) || VALIDATORS.validateURL(value);
}

function validateTeam(value) {
	return VALIDATORS.stringNotEmpty(value) || VALIDATORS.validateTeam(value);
}

function validateTitle(value) {
	return VALIDATORS.stringNotEmpty(value);
}

function validator(values) {
	const errors = {};
	const firstNameError = validateName(values[FIELD_TYPES.FIRST_NAME]),
		lastNameError = validateName(values[FIELD_TYPES.LAST_NAME]),
		locationError = validateLocation(values[FIELD_TYPES.LOCATION]),
		colorError = VALIDATORS.stringNotEmpty(values[FIELD_TYPES.COLOR]),
		urlError = validateImage(values[FIELD_TYPES.IMAGE]),
		teamError = validateTeam(values[FIELD_TYPES.TEAM]),
		titleError = validateTitle(values[FIELD_TYPES.TITLE]);

	populateErrors(errors, firstNameError, FIELD_TYPES.FIRST_NAME);
	populateErrors(errors, lastNameError, FIELD_TYPES.LAST_NAME);
	populateErrors(errors, locationError, FIELD_TYPES.LOCATION);
	populateErrors(errors, colorError, FIELD_TYPES.COLOR);
	populateErrors(errors, urlError, FIELD_TYPES.IMAGE);
	populateErrors(errors, teamError, FIELD_TYPES.TEAM);
	populateErrors(errors, titleError, FIELD_TYPES.TITLE);
	return errors;
}

export default validator;
