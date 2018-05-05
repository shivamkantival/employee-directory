//utils
import _get from 'lodash/get';
import _find from 'lodash/find';

//constants
import USER_DETAIL_TYPES from 'constants/userDetailTypes';
import TEAMS, {TEAMLESS} from 'constants/teams';

function adaptColorForQuery(value) {
	return value && value.split('#')[1];
}

function adaptTeamForDisplay(value = TEAMLESS.value) {
	return _find(TEAMS, teamOption => teamOption.value === value).label;
}

function adaptColorForDisplay(value = 'ffff') {
	return `#${value}`;
}

function replaceAll(intialString, valueToReplace, replacement) {
	return intialString.split(valueToReplace).join(replacement);
}

export function adaptUserDetailsForQuery(userDetails) {
	const color = userDetails[USER_DETAIL_TYPES.COLOR];

	return {
		...userDetails,
		[USER_DETAIL_TYPES.COLOR]: adaptColorForQuery(color),
	};
}

export function adaptUserDetailsForDisplay(userDetails) {
	const color = userDetails[USER_DETAIL_TYPES.COLOR],
		team = userDetails[USER_DETAIL_TYPES.TEAM];

	return {
		...userDetails,
		[USER_DETAIL_TYPES.COLOR]: adaptColorForDisplay(color),
		[USER_DETAIL_TYPES.TEAM]: adaptTeamForDisplay(team),
	};
}

export function getFullName(userDetails) {
	return [_get(userDetails, `${USER_DETAIL_TYPES.FIRST_NAME}`, ''), _get(userDetails, `${USER_DETAIL_TYPES.LAST_NAME}`, '')]
    .join(' ');
}

export function getFormattedLocation(userDetails) {
	const regionSeperatedString = replaceAll(userDetails[USER_DETAIL_TYPES.LOCATION], '/', ' - ');
	return replaceAll(regionSeperatedString, '_', ' ');
}

export default {
	adaptUserDetailsForQuery,
	adaptUserDetailsForDisplay,
	getFullName,
	getFormattedLocation,
};
