import {
	FIRST_NAME,
	LAST_NAME,
	TITLE,
	LOCATION,
	COLOR,
	IMAGE,
	TEAM,
} from "constants/userDetailTypes";
import {FIELD_TYPES} from 'components/atoms/FormFields';
import locationZones from 'constants/timezoneConstants';
import teamOptions from 'constants/teams';

export const config = {
	[FIRST_NAME]: {
		fieldName: FIRST_NAME,
		label: 'Employee\'s first name',
		placeholder: 'Enter first name',
		type: FIELD_TYPES.TEXT_INPUT,
	},
	[LAST_NAME]: {
		fieldName: LAST_NAME,
		label: 'Employee\'s last name',
		placeholder: 'Enter last name',
		type: FIELD_TYPES.TEXT_INPUT,
	},
	[TITLE]: {
		fieldName: TITLE,
		label: 'Job title',
		placeholder: 'Enter designation',
		type: FIELD_TYPES.TEXT_INPUT,
	},
	[LOCATION]: {
		fieldName: LOCATION,
		label: 'Select Location',
		type: FIELD_TYPES.SINGLE_SELECT,
		options: locationZones,
	},
	[COLOR]: {
		fieldName: COLOR,
		label: 'Select profile color',
		type: FIELD_TYPES.COLOR_SELECT,
	},
	[IMAGE]: {
		fieldName: IMAGE,
		label: 'Input avatar URl',
		placeholder: 'Enter avatar URL',
		type: FIELD_TYPES.TEXT_INPUT,
	},
	[TEAM]: {
		fieldName: TEAM,
		label: 'Select Employee Team',
		type: FIELD_TYPES.SINGLE_SELECT,
		options: teamOptions,
	},
};

export const fields = [FIRST_NAME, LAST_NAME, TITLE, LOCATION, COLOR, IMAGE, TEAM];
