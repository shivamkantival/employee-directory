//utils
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';

//constants
import USER_DETAIL_TYPES from 'constants/userDetailTypes';


function adaptColorForQuery(value) {
  return value && value.split('#')[1];
}

function adaptColorForDisplay(value) {
  return '#' + value;
}

function replaceAll(intialString, valueToReplace, replacement) {
  return intialString.split(valueToReplace).join(replacement);
}

export function adaptUserDetailsForQuery(userDetails) {
  const color = userDetails[USER_DETAIL_TYPES.COLOR];
  
  userDetails[USER_DETAIL_TYPES.COLOR] = adaptColorForQuery(color);
  
  return userDetails;
}

export function adaptUserDetailsForDisplay(userDetails) {
  const color = userDetails[USER_DETAIL_TYPES.COLOR];
  
  return Object.assign({},
    userDetails,
    {[USER_DETAIL_TYPES.COLOR]: adaptColorForDisplay(color)},
  );
}

export function getFullName(userDetails) {
  return [_get(userDetails, `${USER_DETAIL_TYPES.FIRST_NAME}`, ''), _get(userDetails, `${USER_DETAIL_TYPES.LAST_NAME}`, '')]
    .join(' ');
}

export function getFormattedLocation(userDetails) {
  const regionSeperatedString = replaceAll(userDetails[USER_DETAIL_TYPES.LOCATION], '/', ' - ');
  return replaceAll(regionSeperatedString, '_', ' ');
}
