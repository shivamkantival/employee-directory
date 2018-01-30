import {
	FIRST_NAME,
	LAST_NAME,
	LOCATION,
	TEAM
} from "constants/userDetailTypes";
import {FIELD_TYPES} from 'components/atoms/FormFields';
import locationZones from 'constants/timezoneConstants';
import teamOptions from 'constants/teams';

export const config = {
	[FIRST_NAME]: {
		fieldName: FIRST_NAME,
		label: 'Employee\'s first name',
		placeholder: 'First name',
		type: FIELD_TYPES.TEXT_INPUT,
	},
	[LAST_NAME]: {
		fieldName: LAST_NAME,
		label: 'Employee\'s last name',
		placeholder: 'Last name',
		type: FIELD_TYPES.TEXT_INPUT,
	},
	[LOCATION]: {
		fieldName: LOCATION,
		label: 'Select Location',
		type: FIELD_TYPES.SINGLE_SELECT,
		options: locationZones,
	},
	[TEAM]: {
		fieldName: TEAM,
		label: 'Select Employee Team',
		type: FIELD_TYPES.SINGLE_SELECT,
		options: teamOptions,
	}
}

export const fields = [FIRST_NAME, LAST_NAME, TEAM, LOCATION];