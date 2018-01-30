//utils
import _isEmpty from 'lodash/isEmpty';

//constants
import USER_DETAIL_TYPES from 'constants/userDetailTypes'
import LOCATION_OPTIONS from 'constants/timezoneConstants';
import TEAM_OPTIONS from 'constants/teams';


function adaptColor(value) {
	return value && value.split('#')[1];
}

export function adaptUserDetails(userDetails) {
	const color = userDetails[USER_DETAIL_TYPES.COLOR];
	
	userDetails[USER_DETAIL_TYPES.COLOR] = adaptColor(color);
	
	return userDetails;
}